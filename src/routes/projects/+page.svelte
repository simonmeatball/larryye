<script>
    import Button from '../../components/Button.svelte';
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
        Projects
    </text>
</svg>

<div class="justify-center text-center w-full pb-5">
    <p class="font-mono pt-4 text-lg">Page under construction. Meanwhile, check out my resume!</p>
    <img src="/UCLA Resume - Larry Ye (Hardware).jpg" alt="Larry Ye's resume" class="w-10/12 md:w-1/2 mx-auto my-4" />
    <Button label="Return Home" href="/" />
</div>