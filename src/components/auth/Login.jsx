import React, { useEffect, useRef, useState } from 'react';

const Login = ({ onLogin }) => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        firm: '',
        cop: '',
        fiscalYear: '2081/81'
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const waveCanvasRef = useRef(null);
    const particleCanvasRef = useRef(null);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!form.username || !form.password) {
            setError('Username and password are required.');
            return;
        }
        
        if (form.username.length < 3) {
            setError('Username must be at least 3 characters long.');
            return;
        }
        
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        
        // Demo authentication (replace with actual API call)
        if (form.username === 'admin' && form.password === 'admin123') {
            onLogin({ username: form.username, name: 'Auditor' });
            setError('');
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    const gradient =
        'radial-gradient(120% 80% at 12% 20%, rgba(56, 130, 246, 0.35), transparent 45%),' +
        'radial-gradient(120% 80% at 78% 0%, rgba(73, 97, 246, 0.24), transparent 42%),' +
        'linear-gradient(135deg, #05122b 0%, #0a1a3a 50%, #041026 100%)';

    useEffect(() => {
        const canvas = waveCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let frameId;
        let time = 0;

        const options = {
            baseHeight: 200,
            amplitude: 15,
            wavelength: 150,
            speed: 0.015,
            layers: [
                'rgba(102, 178, 255, 0.22)',
                'rgba(120, 190, 255, 0.18)',
                'rgba(78, 163, 255, 0.15)',
                'rgba(56, 130, 246, 0.12)',
                'rgba(73, 97, 246, 0.10)',
                'rgba(102, 178, 255, 0.08)',
                'rgba(120, 190, 255, 0.06)',
                'rgba(78, 163, 255, 0.04)'
            ]
        };

        const resize = () => {
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = width * dpr;
            canvas.height = height * dpr;
        };

        const drawLayer = (layerIndex) => {
            const { width, height } = canvas;
            const amplitude = (options.amplitude + layerIndex * 8) * dpr;
            const wavelength = (options.wavelength + layerIndex * 18) * dpr;
            const offsetY = (options.baseHeight + layerIndex * 18) * dpr;
            const phaseShift = layerIndex * 0.7;

            ctx.beginPath();
            ctx.moveTo(0, height);

            for (let x = 0; x <= width; x += 6 * dpr) {
                const normX = x / wavelength;
                const y = height - (Math.sin(normX + time + phaseShift) * amplitude + offsetY);
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fillStyle = options.layers[layerIndex] || options.layers[options.layers.length - 1];
            ctx.fill();
        };

        const render = () => {
            const { width, height } = canvas;
            if (!width || !height) return;

            ctx.clearRect(0, 0, width, height);
            ctx.globalAlpha = 1;
            time += options.speed;

            for (let i = 0; i < options.layers.length; i += 1) {
                drawLayer(i);
            }

            frameId = requestAnimationFrame(render);
        };

        resize();
        render();
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    useEffect(() => {
        const canvas = particleCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let points = [];
        let target = { x: width / 2, y: height / 2 };
        let animateHeader = true;
        let frameId;

        const resize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const getDistance = (p1, p2) => {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        };

        const Circle = function(pos, rad, color) {
            this.pos = pos || null;
            this.radius = rad || null;
            this.color = color || null;
            this.active = 0;

            this.draw = function() {
                if (!this.active) return;
                ctx.beginPath();
                ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')';
                ctx.fill();
            };
        };

        const initPoints = () => {
            points = [];
            for (let x = 0; x < width; x = x + width / 20) {
                for (let y = 0; y < height; y = y + height / 20) {
                    const px = x + Math.random() * width / 20;
                    const py = y + Math.random() * height / 20;
                    const p = { x: px, originX: px, y: py, originY: py };
                    points.push(p);
                }
            }

            for (let i = 0; i < points.length; i++) {
                const closest = [];
                const p1 = points[i];
                for (let j = 0; j < points.length; j++) {
                    const p2 = points[j];
                    if (p1 !== p2) {
                        let placed = false;
                        for (let k = 0; k < 5; k++) {
                            if (!placed) {
                                if (closest[k] === undefined) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }

                        for (let k = 0; k < 5; k++) {
                            if (!placed) {
                                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }
                    }
                }
                p1.closest = closest;
            }

            for (let i in points) {
                const c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
                points[i].circle = c;
            }
        };

        const shiftPoint = (p) => {
            const duration = 1000 + Math.random() * 1000;
            const targetX = p.originX - 50 + Math.random() * 100;
            const targetY = p.originY - 50 + Math.random() * 100;
            const startTime = Date.now();
            const startX = p.x;
            const startY = p.y;

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

                p.x = startX + (targetX - startX) * eased;
                p.y = startY + (targetY - startY) * eased;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    shiftPoint(p);
                }
            };
            animate();
        };

        const drawLines = (p) => {
            if (!p.active) return;
            for (let i in p.closest) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.closest[i].x, p.closest[i].y);
                ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
                ctx.stroke();
            }
        };

        const animate = () => {
            if (animateHeader) {
                ctx.clearRect(0, 0, width, height);
                for (let i in points) {
                    if (Math.abs(getDistance(target, points[i])) < 4000) {
                        points[i].active = 0.3;
                        points[i].circle.active = 0.6;
                    } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                        points[i].active = 0.1;
                        points[i].circle.active = 0.3;
                    } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                        points[i].active = 0.02;
                        points[i].circle.active = 0.1;
                    } else {
                        points[i].active = 0;
                        points[i].circle.active = 0;
                    }

                    drawLines(points[i]);
                    points[i].circle.draw();
                }
            }
            frameId = requestAnimationFrame(animate);
        };

        const mouseMove = (e) => {
            target.x = e.clientX;
            target.y = e.clientY;
        };

        resize();
        initPoints();
        animate();
        
        for (let i in points) {
            shiftPoint(points[i]);
        }

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f2f3f7]">
            {/* Left visual panel */}
            <div
                className="relative hidden lg:flex flex-col text-white px-12 pb-16 pt-24 overflow-hidden"
                style={{ backgroundImage: gradient }}
            >
                <div className="absolute inset-0" aria-hidden>
                    <canvas
                        ref={particleCanvasRef}
                        className="absolute inset-0 w-full h-full opacity-60"
                        style={{ filter: 'blur(1px)' }}
                    />
                    <canvas
                        ref={waveCanvasRef}
                        className="absolute inset-x-0 bottom-[-60px] h-[420px] w-full opacity-[0.75]" 
                    />
                </div>

                <div className="relative z-10 flex flex-col flex-1 justify-end pt-28 pb-2">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 self-start">
                            <img
                                src="/img/logo1.png"
                                alt="AICA Nepal Logo"
                                className="h-20 w-auto drop-shadow-md"
                            />
                        </div>
                        
                        <div className="space-y-4 max-w-xl">
                        <h1 className="text-4xl font-bold leading-tight">
                            Automating Nepal’s Financial Future
                        </h1>
                        <p className="text-blue-100 leading-relaxed text-base">
                            Secure, ICAN-Compliant financial statement automation designed for the modern chartered accountant and Registered Auditors. Experience audit readiness and excel-friendly interface.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm font-semibold text-blue-50">
                        <div className="flex items-center gap-2 rounded-full bg-white/30 px-4 py-2 backdrop-blur-xl border border-white/40 shadow-lg">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            NAS Compliant
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-white/30 px-4 py-2 backdrop-blur-xl border border-white/40 shadow-lg">
                            <span className="h-2 w-2 rounded-full bg-sky-300" />
                            256-bit Encryption
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="flex items-start justify-center p-6 lg:p-12 bg-[#f2f3f7]">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_16px_45px_-16px_rgba(15,23,42,0.35)] border border-gray-100 p-8 lg:p-10 mt-6 lg:mt-10">
                    <header className="mb-8 space-y-1">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back, Auditor</h2>
                        <p className="text-sm text-gray-600">Please Sign in to Access your Firm’s workspace.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-800">Username or ICAN Membership No.</label>
                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                <input
                                    type="text"
                                    value={form.username}
                                    onChange={handleChange('username')}
                                    placeholder="Enter Your ID"
                                    className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                                    required
                                />
                                <span className="text-gray-400" aria-hidden>👤</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-gray-800">Password</label>
                                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                    Forget Password ?
                                </button>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange('password')}
                                    placeholder="************"
                                    className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <span aria-hidden>{showPassword ? '🙈' : '👁️'}</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
                            <span className="flex-1 h-px bg-gray-200" />
                            Firm Configuration
                            <span className="flex-1 h-px bg-gray-200" />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-800">Firm Legal Name</label>
                                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                    <input
                                        type="text"
                                        value={form.firm}
                                        onChange={handleChange('firm')}
                                        placeholder="e.g. ABC & Associates"
                                        className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-800">COP/ Reg No.</label>
                                    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                        <input
                                            type="text"
                                            value={form.cop}
                                            onChange={handleChange('cop')}
                                            placeholder="Cop. No."
                                            className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-800">Fiscal Year(B.S)</label>
                                    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                        <input
                                            type="text"
                                            value={form.fiscalYear}
                                            onChange={handleChange('fiscalYear')}
                                            placeholder="2081/81"
                                            className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {error ? (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#0b50c7] py-4 text-white text-base font-semibold shadow-md shadow-blue-200 transition hover:bg-[#0a3f9f]"
                        >
                            Secure Login & Launch Workspace →
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
