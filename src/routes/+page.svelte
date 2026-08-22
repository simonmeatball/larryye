<script>
    import { onMount } from 'svelte';
    import { Instagram, Linkedin, Github, Utensils, RotateCw, Sparkles } from 'lucide-svelte';
    import Button from '../components/Button.svelte';
    
    let x = 0, y = 0;
    let width = 0, height = 0;
    let isFlipped = false;
    let enablePeek = true;

    onMount(() => {
        // Automatically stop peek animation after it plays (2.5s delay + 1.8s animation)
        const timer = setTimeout(() => {
            enablePeek = false;
        }, 4800);
        return () => clearTimeout(timer);
    });

    function toggleFlip() {
        enablePeek = false;
        isFlipped = !isFlipped;
    }

    /**
   * @param {{ currentTarget: { getBoundingClientRect: () => any; }; clientX: number; clientY: number; }} event
   */
    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        x = (event.clientX - rect.left) / width - 0.5;
        y = (event.clientY - rect.top) / height - 0.5;
    }

    function resetTransform() {
        x = 0;
        y = 0;
    }
</script>

<main class="min-h-screen min-h-[100dvh] h-screen h-[100dvh] w-full flex flex-col justify-center items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4 box-border text-center overflow-y-auto overflow-x-hidden">
    <!-- Top Header & Prompt -->
    <div class="w-full flex flex-col items-center shrink-0 pt-0.5 pb-0.5 max-w-lg md:max-w-xl">
        <svg stroke="#bac736" stroke-width="2" class="text-line h-12 sm:h-16 md:h-20 w-full" viewBox="0 0 680 85">
            <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#f3ec78" />
                    <stop offset="100%" stop-color="#af4261" />
                </linearGradient>
            </defs>
            <text 
                class="text-center" 
                x="50%" 
                y="62%" 
                dominant-baseline="middle" 
                text-anchor="middle"
                font-size="62">
                Hi! I'm Larry Ye
            </text>
        </svg>

        <div class="w-full flex justify-center pt-0.5">
            <p class="typewriter font-mono text-slate-400 text-xs sm:text-sm">
                Click the photo to flip & learn about me
            </p>
        </div>
    </div>

    <!-- Center Profile Card Container -->
    <div class="image-container flex justify-center items-center shrink-0 p-0.5 sm:p-1">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="transform-wrapper rounded-3xl flex justify-center cursor-pointer group shadow-2xl"
          class:flipped={isFlipped}
          class:peek-animation={enablePeek && !isFlipped}
          on:click={toggleFlip}
        >
            <div 
                class="frontside relative overflow-hidden flex justify-center items-center rounded-3xl" 
                style="transform: rotateX({y * 10}deg) rotateY({-x * 10}deg);"
                on:mousemove={handleMouseMove}
                on:mouseleave={resetTransform}
            >
                <img 
                    src="/linkedinprofilepiccropped.png" 
                    alt="Larry Ye"
                    class="rounded-3xl w-full h-full object-cover object-center"
                />
            </div>
            <div 
                class="backside flex justify-center items-center align-middle relative overflow-hidden rounded-3xl"
                style="transform: rotateY(180deg) rotateX({y * 10}deg) rotateY({x * 10}deg);"
                on:mousemove={handleMouseMove}
                on:mouseleave={resetTransform}
            >
                <div class="align-middle space-y-2 sm:space-y-3 p-4 sm:p-6 overflow-y-auto max-h-full">
                    <h1 class="text-xl sm:text-3xl font-bold w-full text-center">Who am I?</h1>
                    <p class="font-mono text-xs sm:text-sm leading-relaxed">Hello, I'm Larry! I'm an electrical engineer, photographer, and foodie based in the Bay Area. I'm currently in my fourth year at UCLA studying electrical engineering. I'm passionate about creating beautiful and functional software, building cool electrical projects, and capturing unique moments through photography. I'm always looking for new opportunities to learn and grow, so feel free to reach out to me!</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Social Links & Action Buttons -->
    <div class="w-full flex flex-col items-center shrink-0 space-y-2 sm:space-y-2.5">
        <div class="flex justify-center space-x-4 sm:space-x-5">
            <a href="https://www.linkedin.com/in/larryye05/"><Linkedin size="28" class="sm:w-9 sm:h-9 hover:stroke-[#DF0024] hover-lift" /></a>
            <a href="https://github.com/simonmeatball"><Github size="28" class="sm:w-9 sm:h-9 hover:stroke-[#F3C300] hover-lift" /></a>
            <a href="https://www.instagram.com/lye_photo"><Instagram size="30" class="sm:w-10 sm:h-10 hover:stroke-[#00AC9F] hover-lift" /></a>
            <a href="https://www.yelp.com/user_details?userid=UC4NN00SeDcn5C74wdwbTw"><Utensils size="28" class="sm:w-9 sm:h-9 hover:stroke-[#2E6DB4] hover-lift" /></a>
        </div>

        <div class="flex justify-center space-x-3 sm:space-x-4">
            <Button label="Projects" href="/projects" />
            <Button label="Resume" href="/resume" />
        </div>
    </div>
</main>

<style>
    .image-container {
        perspective: 1000px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .transform-wrapper {
        position: relative;
        /* Strictly budget 245px for header, footer, and gaps so card never pushes elements off screen */
        height: min(calc(100vh - 245px), calc(100dvh - 245px), calc((100vw - 32px) * 4 / 3), 520px);
        width: min(calc((100vh - 245px) * 3 / 4), calc((100dvh - 245px) * 3 / 4), calc(100vw - 32px), 390px);
        aspect-ratio: 3 / 4;
        border-radius: 1.5rem;
        transform-style: preserve-3d;
        transition: transform 0.6s ease;
    }

    .transform-wrapper.flipped {
        transform: rotateY(180deg);
    }

    /* Auto-Peek 3D rotation animation on initial load */
    .transform-wrapper.peek-animation {
        animation: peek 1.8s ease-in-out 3s 1 normal forwards;
    }

    @keyframes peek {
        0% { transform: rotateY(0deg); }
        35% { transform: rotateY(-12deg) rotateX(-4deg); }
        65% { transform: rotateY(6deg) rotateX(2deg); }
        100% { transform: rotateY(0deg); }
    }

    .frontside,
    .backside {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 1.5rem;
        overflow: hidden;
        transition: transform 0.15s ease;
        font-family: 'Pacifico', cursive;
    }

    .frontside {
        background-color: transparent;
    }

    .backside {
        background: radial-gradient(circle, #f3ec78, #af4261);
        color: black;
        transform: rotateY(180deg);
        text-align: left;
    }

    /* Typewriter Effect */
    .typewriter {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        border-right: 2px solid #f3ec78;
        width: 0;
        max-width: fit-content;
        padding-right: 4px;
        animation: 
            typewriter 2.2s steps(40, end) 0.3s forwards,
            blinkCursor 0.75s step-end infinite;
    }

    @keyframes typewriter {
        from { width: 0; }
        to { width: 41ch; }
    }

    @keyframes blinkCursor {
        from, to { border-color: transparent; }
        50% { border-color: #f3ec78; }
    }

    :global(.animate-spin-slow) {
        animation: spin 6s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>