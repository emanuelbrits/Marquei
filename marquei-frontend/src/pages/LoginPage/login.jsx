import { useEffect, useRef, useState } from "react"
import { supabase } from '../../lib/helper/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { useNavigate } from "react-router-dom"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { Helmet } from "react-helmet"

export function LoginPage() {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    useEffect(() => {
        const session = supabase.auth.getSession();
        setUser(session?.user);
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            switch (event) {
                case "SIGNED_IN":
                    setUser(session?.user)
                    navigate("/")
                    break;
                case "SIGNED_OUT":
                    setUser(null)
                    break
                default:
            }
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    return (
        <div class="container text-center " id="login">
            <Helmet>
                <title>Controle de vendas - Login</title>
            </Helmet>
            <h1>Entrar</h1>
            <Auth
                supabaseClient={supabase}
                localization={{
                    variables: {
                        sign_in: {
                            email_label: '',
                            email_input_placeholder: 'e-mail',
                            password_input_placeholder: 'senha',
                            password_label: '',
                            button_label: 'Entrar'
                        },
                    },
                }}
                appearance={{
                    theme: ThemeSupa,
                    className: {
                        button: 'botaoLogin',
                    }
                }}
                theme="dark"
                providers={[]}
                showLinks={false}
            />
        </div>
    )
}

export default LoginPage