<script>
    import { Instagram } from 'lucide-svelte';
    import { Linkedin } from 'lucide-svelte';
    import { Github } from 'lucide-svelte';
    import { Utensils } from 'lucide-svelte';
    import Button from '../components/Button.svelte';
    
    let x = 0, y = 0;
    let width = 0, height = 0;
    let isFlipped = false;

    function toggleFlip() {
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

<head>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
</head>


<svg stroke="#bac736" stroke-width="2" class="pt-6 text-line max-h-32 sm:h-30" width="100%">
    <defs>
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#f3ec78" />
            <stop offset="100%" stop-color="#af4261" />
    </defs>
    <text 
    class="text-center text-4xl sm:text-7xl md:text-7xl lg:text-7xl xs:text-5xl" 
    x="50%" 
    y="50%" 
    dominant-baseline="middle" 
    text-anchor="middle">
    Hi! I'm Larry Ye
</text>
</svg>

<p class="w-full text-center font-mono text-slate-500 pt-1 max-sm:text-xs fade-in">Scroll for more or click the image to learn about me</p>

<div class="image-container flex justify-center my-4">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="transform-wrapper rounded-3xl flex justify-center max-h-screen max-w-screen"
      class:flipped={isFlipped}
      on:click={toggleFlip}
    >
        <div 
            class="frontside" 
            style="transform: rotateX({y * 10}deg) rotateY({-x * 10}deg);"
            on:mousemove={handleMouseMove}
            on:mouseleave={resetTransform}
        >
            <img 
            src="/linkedinprofilepiccropped.png" 
            alt="Larry Ye"
            class="rounded-3xl flex justify-center max-h-screen max-w-screen"
            />
        </div>
        <div 
            class="backside flex justify-center items-center align-middle"
            style="transform: rotateY(180deg) rotateX({y * 10}deg) rotateY({x * 10}deg);"
            on:mousemove={handleMouseMove}
            on:mouseleave={resetTransform}
        >
            <div class="align-middle space-y-4">
                <h1 class="text-3xl sm:text-5xl md:text-5xl lg:text-5xl xs:text-4xl w-full text-center">Who am I?</h1>
                <p class="max-w-fit font-mono text-xs lg:text-xl lg:pt-3 lg:px-3 md:text-xl md:pt-3 sm:text-lg sm:pt-4 xs:text-sm">Hello, I'm Larry! I'm an electrical engineer, photographer, and foodie based in the Bay Area. I'm passionate about creating beautiful and functional software, building cool electrical projects, and capturing unique moments through photography. I'm always looking for new opportunities to learn and grow, so feel free to reach out to me!</p>
            </div>
        </div>
    </div>
</div>

<div class="flex flex-shrink justify-center py-6 space-x-5">
    <a href="https://www.linkedin.com/in/larryye05/"><Linkedin size="48" class="hover:stroke-[#DF0024] hover-lift" /></a>
    <a href="https://github.com/simonmeatball"><Github size="48" class="hover:stroke-[#F3C300] hover-lift" /></a>
    <a href="https://www.instagram.com/lye_photo"><Instagram size="48" class="hover:stroke-[#00AC9F] hover-lift" /></a>
    <a href="https://www.yelp.com/user_details?userid=UC4NN00SeDcn5C74wdwbTw"><Utensils size="48" class="hover:stroke-[#2E6DB4] hover-lift" /></a>
</div>

<div class="flex justify-center pb-6 space-x-4">
    <Button label="Projects" href="/projects" />
    <Button label="Resume" href="/resume" />
</div>


<style>
    .image-container {
        perspective: 1000px;
    }

    .transform-wrapper {
        position: relative;
        width: 70vh; /* Adjust as needed */
        height: 90vw;
        transform-style: preserve-3d;
        transition: transform 0.6s ease;
    }

    .transform-wrapper.flipped {
        transform: rotateY(180deg);
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
        transition: transform 0.15s ease;
        font-family: 'Pacifico', cursive;
    }

    .frontside {
        background-color: transparent;
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
    }

    .backside {
        background: radial-gradient(circle, #f3ec78, #af4261);
        color: black;
        transform: rotateY(180deg);
        width: auto;
        height: vh;
        padding: 30px;
        text-align: left;
    }

    img {
        border-radius: 1.5rem;
        max-height: 90vh;
        max-width: 90vw;
    }

    .max-h-screen {
        max-height: 90vh;
    }

    .max-w-screen {
        max-width: 70vw;
    }

    .fade-in {
        opacity:0;
        animation-name: fadeIn;
        animation-duration: 2s;
        animation-delay: 5s;
        animation-fill-mode: forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>