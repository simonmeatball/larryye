<script>
    import { Instagram } from 'lucide-svelte';
    import { Linkedin } from 'lucide-svelte';
    import { Github } from 'lucide-svelte';
    import { Utensils } from 'lucide-svelte';
    
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

<link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">

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
            class="backside space-y-4 justify-center items-center"
            style="transform: rotateY(180deg) rotateX({y * 10}deg) rotateY({x * 10}deg);"
            on:mousemove={handleMouseMove}
            on:mouseleave={resetTransform}
        >
            <h1 class="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xs:text-4xl w-full">About Me</h1>
            <p class="max-w-fit">Hello, I'm Larry Ye! I'm an electrical engineer and photographer based in the Bay Area. I'm passionate about creating beautiful and functional software, and I love capturing moments through photography. I'm always looking for new opportunities to learn and grow, so feel free to reach out to me!</p>
        </div>
    </div>
</div>

<div class="flex justify-center py-6 space-x-5">
    <a href="https://www.linkedin.com/in/larryye05/"><Linkedin size="48" class="hover:stroke-[#DF0024]" /></a>
    <a href="https://github.com/simonmeatball"><Github size="48" class="hover:stroke-[#F3C300]" /></a>
    <a href="https://www.instagram.com/lye_photo"><Instagram size="48" class="hover:stroke-[#00AC9F]" /></a>
    <a href="https://www.yelp.com/user_details?userid=UC4NN00SeDcn5C74wdwbTw"><Utensils size="48" class="hover:stroke-[#2E6DB4]" /></a>
</div>


<style>
    .image-container {
        perspective: 1200px;
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
        transition: transform 0.2s ease;
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
        padding: 50px;
        text-align: center;
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

    .text-line {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: dash 5s linear forwards, filling 5s ease-in forwards;
    font-size: 80px;
    }

    .text-line text {
    font-family: 'Pacifico', cursive;
    fill: url(#gradient);
    stroke: url(#gradient);
    stroke-width: 2;
    font-weight: normal;
    font-style: normal;
    }

    @keyframes dash {
    to {
        stroke-dashoffset: 0;
    }
    }

    @keyframes filling {
    0%, 90% { fill-opacity: 0; }
    100% { fill-opacity: 1; }
    }
</style>