<script>
    import Button from '../../components/Button.svelte';
</script>

<div class="w-full flex justify-center pt-6 pb-2 max-w-md sm:max-w-xl mx-auto px-4">
    <svg stroke="#bac736" stroke-width="2" class="text-line h-20 sm:h-28 md:h-32 w-full" viewBox="0 0 500 100">
        <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#f3ec78" />
                <stop offset="100%" stop-color="#af4261" />
            </linearGradient>
        </defs>
        <text 
            class="text-center" 
            x="50%" 
            y="65%" 
            dominant-baseline="middle" 
            text-anchor="middle"
            font-size="70">
            Resume
        </text>
    </svg>
</div>

<div class="justify-center text-center w-full pb-5">
    <img src="/UCLA Resume - Larry Ye (Hardware).jpg" alt="Larry Ye's resume" class="w-10/12 md:w-1/2 mx-auto my-6" />
    <Button label="Return Home" href="/" />
</div>