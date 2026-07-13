"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, CartItem, Order, DbProduct } from "@/lib/types";
import { supabase } from "@/lib/supabaseClient";

interface StoreContextType {
  user: UserProfile | null;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  loading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, name: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  addToCart: (item: Omit<CartItem, "qty"> & { qty?: number }, stockLimit: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQty: (productId: string, size: string, color: string, qty: number, stockLimit: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (customer: Order["customer"]) => Promise<{ success: boolean; order?: Order; error?: string }>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Initial State Load from LocalStorage and Check Supabase Session
  useEffect(() => {
    async function initSession() {
      try {
        // Attempt to check Supabase session if configured correctly
        const isSupabasePlaceholder = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project-id");
        if (!isSupabasePlaceholder) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Get profile details
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("uid", session.user.id)
              .single();

            if (profile) {
              setUser({
                uid: profile.uid,
                email: profile.email,
                name: profile.name,
                isAdmin: profile.is_admin || false,
                wishlist: profile.wishlist || [],
                createdAt: new Date(profile.created_at).getTime(),
              });
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("Supabase init failed, falling back to local session:", err);
      }

      // Local Session Fallback
      const storedSession = localStorage.getItem("draven_session_user");
      if (storedSession) {
        try {
          setUser(JSON.parse(storedSession));
        } catch {
          localStorage.removeItem("draven_session_user");
        }
      }
      setLoading(false);
    }

    initSession();
  }, []);

  // 2. Sync Cart, Wishlist, and Orders whenever active User changes
  useEffect(() => {
    const userKey = user ? user.email : "guest";
    
    // Load Cart
    const storedCart = localStorage.getItem(`draven_cart_${userKey}`);
    if (storedCart) {
      try { setCart(JSON.parse(storedCart)); } catch { setCart([]); }
    } else {
      setCart([]);
    }

    // Load Wishlist
    const storedWishlist = localStorage.getItem(`draven_wishlist_${userKey}`);
    if (storedWishlist) {
      try { setWishlist(JSON.parse(storedWishlist)); } catch { setWishlist([]); }
    } else {
      setWishlist(user ? user.wishlist || [] : []);
    }

    // Load Orders
    const storedOrders = localStorage.getItem(`draven_orders_${userKey}`);
    if (storedOrders) {
      try { setOrders(JSON.parse(storedOrders)); } catch { setOrders([]); }
    } else {
      setOrders([]);
    }
  }, [user]);

  // Save Cart helper
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    const userKey = user ? user.email : "guest";
    localStorage.setItem(`draven_cart_${userKey}`, JSON.stringify(newCart));
  };

  // Save Wishlist helper
  const saveWishlist = (newWishlist: string[]) => {
    setWishlist(newWishlist);
    const userKey = user ? user.email : "guest";
    localStorage.setItem(`draven_wishlist_${userKey}`, JSON.stringify(newWishlist));
    
    // Update local user object if logged in
    if (user) {
      const updatedUser = { ...user, wishlist: newWishlist };
      setUser(updatedUser);
      localStorage.setItem("draven_session_user", JSON.stringify(updatedUser));
      
      // Update local storage users database
      const localUsers = localStorage.getItem("draven_users");
      if (localUsers) {
        try {
          const parsedUsers = JSON.parse(localUsers);
          const userIdx = parsedUsers.findIndex((u: any) => u.email === user.email);
          if (userIdx > -1) {
            parsedUsers[userIdx].wishlist = newWishlist;
            localStorage.setItem("draven_users", JSON.stringify(parsedUsers));
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  // Save Orders helper
  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    const userKey = user ? user.email : "guest";
    localStorage.setItem(`draven_orders_${userKey}`, JSON.stringify(newOrders));
  };

  // Auth Operations
  const login = async (email: string, password?: string) => {
    // Attempt Supabase
    try {
      const isSupabasePlaceholder = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project-id");
      if (!isSupabasePlaceholder) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: password || "placeholder123",
        });

        if (data?.user && !error) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("uid", data.user.id)
            .single();

          const activeUser: UserProfile = {
            uid: data.user.id,
            email: email,
            name: profile?.name || email.split("@")[0],
            isAdmin: profile?.is_admin || false,
            wishlist: profile?.wishlist || [],
            createdAt: new Date(data.user.created_at).getTime(),
          };
          setUser(activeUser);
          localStorage.setItem("draven_session_user", JSON.stringify(activeUser));
          return { success: true };
        }
      }
    } catch (err) {
      console.warn("Supabase login failed, using local fallback", err);
    }

    // Local Storage Mock Auth fallback
    const localUsersStr = localStorage.getItem("draven_users");
    const localUsers: UserProfile[] = localUsersStr ? JSON.parse(localUsersStr) : [];
    
    const existingUser = localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("draven_session_user", JSON.stringify(existingUser));
      return { success: true };
    }

    return { success: false, error: "User not found. Please create an account." };
  };

  const signup = async (email: string, name: string, password?: string) => {
    // Attempt Supabase
    try {
      const isSupabasePlaceholder = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project-id");
      if (!isSupabasePlaceholder) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: password || "placeholder123",
          options: {
            data: { name },
          },
        });

        if (data?.user && !error) {
          // Create profile record in public.profiles table
          const profileData = {
            uid: data.user.id,
            email,
            name,
            wishlist: [],
            is_admin: false,
          };
          await supabase.from("profiles").insert([profileData]);

          const newUser: UserProfile = {
            uid: data.user.id,
            email,
            name,
            wishlist: [],
            createdAt: Date.now(),
          };
          setUser(newUser);
          localStorage.setItem("draven_session_user", JSON.stringify(newUser));
          return { success: true };
        } else if (error) {
          return { success: false, error: error.message };
        }
      }
    } catch (err) {
      console.warn("Supabase signup failed, using local fallback", err);
    }

    // Local Storage Mock Auth fallback
    const localUsersStr = localStorage.getItem("draven_users");
    const localUsers: UserProfile[] = localUsersStr ? JSON.parse(localUsersStr) : [];

    if (localUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser: UserProfile = {
      uid: Math.random().toString(36).substring(2, 9),
      email,
      name,
      wishlist: [],
      createdAt: Date.now(),
    };

    localUsers.push(newUser);
    localStorage.setItem("draven_users", JSON.stringify(localUsers));
    setUser(newUser);
    localStorage.setItem("draven_session_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    // Supabase signout
    try {
      supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
    setUser(null);
    localStorage.removeItem("draven_session_user");
  };

  // Cart Operations
  const addToCart = (item: Omit<CartItem, "qty"> & { qty?: number }, stockLimit: number) => {
    const quantityToAdd = item.qty || 1;
    const existingIndex = cart.findIndex(
      (c) => c.productId === item.productId && c.size === item.size && c.color === item.color
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      const newQty = updatedCart[existingIndex].qty + quantityToAdd;
      updatedCart[existingIndex].qty = Math.min(newQty, stockLimit);
      saveCart(updatedCart);
    } else {
      const newCartItem: CartItem = {
        ...item,
        qty: Math.min(quantityToAdd, stockLimit),
      };
      saveCart([...cart, newCartItem]);
    }
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    const updatedCart = cart.filter(
      (c) => !(c.productId === productId && c.size === size && c.color === color)
    );
    saveCart(updatedCart);
  };

  const updateCartQty = (productId: string, size: string, color: string, qty: number, stockLimit: number) => {
    const targetQty = Math.max(1, Math.min(qty, stockLimit));
    const updatedCart = cart.map((c) => {
      if (c.productId === productId && c.size === size && c.color === color) {
        return { ...c, qty: targetQty };
      }
      return c;
    });
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      saveWishlist(wishlist.filter((id) => id !== productId));
    } else {
      saveWishlist([...wishlist, productId]);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Order Placement
  const placeOrder = async (customer: Order["customer"]) => {
    if (cart.length === 0) {
      return { success: false, error: "Your cart is empty." };
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal >= 10000 ? 0 : 350;
    const total = subtotal + shipping;

    const newOrder: Order = {
      id: "DRV-" + Math.floor(100000 + Math.random() * 900000),
      userId: user ? user.uid : "guest",
      items: [...cart],
      subtotal,
      shipping,
      total,
      customer,
      paymentMethod: "COD",
      status: "pending",
      createdAt: Date.now(),
    };

    // Attempt to write to Supabase orders table if configured
    try {
      const isSupabasePlaceholder = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project-id");
      if (!isSupabasePlaceholder) {
        const { error } = await supabase.from("orders").insert([
          {
            id: newOrder.id,
            user_id: newOrder.userId,
            items: JSON.stringify(newOrder.items),
            subtotal,
            shipping,
            total,
            customer: JSON.stringify(customer),
            payment_method: "COD",
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ]);
        if (error) throw error;
      }
    } catch (err) {
      console.warn("Supabase order write failed, using local database fallback:", err);
    }

    // Save locally
    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    
    // Clear cart after successful checkout
    clearCart();

    return { success: true, order: newOrder };
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        cart,
        wishlist,
        orders,
        loading,
        login,
        signup,
        logout,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
