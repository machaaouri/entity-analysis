import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { Hr, styledCard } from './common';

export const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const { signUp } = useAuth()
    const history = useHistory()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        
        if(emailRef.current && 
            passwordRef.current && passwordConfirmRef.current)
        {
            if(passwordRef.current.value !== passwordConfirmRef.current.value)
                return setError('Passwords do not match')
            try
            {
                setError('')
                setLoading(true)
                await signUp(emailRef.current.value, passwordRef.current.value)
                history.push("/")
            } catch { setError('Failed to create an account')}

            setLoading(false)
        }
    }

    return (
        <Card style={styledCard}>
            <Card.Body>
                <h3 className="text-center mb-4">Sign Up</h3>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Control type="email" ref={emailRef} placeholder="Email address" required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
                    </Form.Group>
                    <Form.Group id="password-confirmation">
                        <Form.Control type="password" ref={passwordConfirmRef} placeholder="Repeat Password" required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                        Sign Up
                        </Button>
                </Form>
                <Hr />
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </Card.Body>
        </Card>
    )
}