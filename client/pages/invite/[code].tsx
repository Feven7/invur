import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Invite() {
    const router = useRouter();
    const { code } = router.query;

    const [hCaptcha, setCaptcha] = useState(false);
    const [authorized, setAuth] = useState(false);
}