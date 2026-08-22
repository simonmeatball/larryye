<script lang="ts">
    import { ChevronLeft, ChevronRight } from 'lucide-svelte';

    export let images: string[] = [];
    export let alt: string = 'Project image';

    let currentIndex = 0;

    function prevSlide(e?: Event) {
        if (e) e.stopPropagation();
        if (images.length <= 1) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }

    function nextSlide(e?: Event) {
        if (e) e.stopPropagation();
        if (images.length <= 1) return;
        currentIndex = (currentIndex + 1) % images.length;
    }

    function goToSlide(index: number, e?: Event) {
        if (e) e.stopPropagation();
        currentIndex = index;
    }

    // Touch swipe handling
    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(e: TouchEvent) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e: TouchEvent) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }
</script>

<div class="relative w-full select-none flex flex-col items-center">
    <!-- Main Photo Container -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="relative w-full max-h-[60vh] sm:max-h-[65vh] rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center group"
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}
    >
        {#if images.length > 0}
            <img 
                src={images[currentIndex]} 
                alt="{alt} - Slide {currentIndex + 1}"
                class="w-full h-full object-contain max-h-[60vh] sm:max-h-[65vh] rounded-2xl transition-opacity duration-300"
            />
        {/if}

        <!-- Next / Previous Chevron Overlay (Shown if multiple images) -->
        {#if images.length > 1}
            <button 
                type="button"
                aria-label="Previous image"
                on:click={prevSlide}
                class="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white p-2 rounded-full border border-white/20 transition-all duration-200 opacity-90 hover:scale-110 shadow-lg"
            >
                <ChevronLeft size={20} />
            </button>

            <button 
                type="button"
                aria-label="Next image"
                on:click={nextSlide}
                class="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white p-2 rounded-full border border-white/20 transition-all duration-200 opacity-90 hover:scale-110 shadow-lg"
            >
                <ChevronRight size={20} />
            </button>
        {/if}
    </div>

    <!-- Instagram-Style Dot Indicators (Centered directly below photo) -->
    {#if images.length > 1}
        <div class="flex items-center justify-center gap-2 pt-3 pb-1">
            {#each images as _, index}
                <button
                    type="button"
                    aria-label="Go to slide {index + 1}"
                    on:click={(e) => goToSlide(index, e)}
                    class="w-2.5 h-2.5 rounded-full transition-all duration-300 {currentIndex === index ? 'bg-white scale-125 shadow-md' : 'bg-white/30 hover:bg-white/60'}"
                ></button>
            {/each}
        </div>
    {/if}
</div>
