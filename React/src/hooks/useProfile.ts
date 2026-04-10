import { supabase } from '../lib/supabaseClient';
import { useState, useEffect } from 'react';

export interface UserProfileData {
    username: string;
    avatar_url: string;
    full_name: string;
    fanatic_coins: number;
    caption: string | null;
    streak: number;
    name: string | null;
}

export function useProfile() {
    const [user, setUser] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasLoadedOnce, setHasLoadedOnce] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getUser = async (showLoader = false) => {
            if (showLoader) {
                setLoading(true);
            }

            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

            const isAnonymousUser =
                authUser?.is_anonymous ||
                authUser?.app_metadata?.provider === "anonymous";

            if (authError || !authUser || isAnonymousUser) {
                setUser(null);
                setError(authError ?? null);
                setLoading(false);
                setHasLoadedOnce(true);
                return;
            }

            const { error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();
            

            if (profileError) {
                setUser(null);
                setError(profileError);
            } else {
                // Después del select de profiles, antes del setUser
                await supabase.rpc("update_login_streak", { user_id: authUser.id });

                // Luego vuelve a leer el perfil actualizado (o haz el select de nuevo)
                const { data: updatedProfile, error: updatedError } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", authUser.id)
                    .single();

                if (updatedError) {
                    setUser(null);
                    setError(updatedError);
                } else {
                    setUser({
                    ...updatedProfile,
                    full_name: updatedProfile.name ?? updatedProfile.username,
                    });
                    setError(null);
                }
            }
            setLoading(false);
            setHasLoadedOnce(true);
        };

        getUser(true);

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            getUser(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { user, loading, hasLoadedOnce, error };
}
