<script lang="ts">
    import { X, ExternalLink } from 'lucide-svelte';
    import ImageCarousel from './ImageCarousel.svelte';
    import type { Project, ProjectLink } from '$lib/data/projects';

    export let project: Project | null = null;

    // Fallback individual props for backwards compatibility
    export let projectName: string = "Project Name";
    export let img: string = "https://placehold.co/600x400/orange/red";
    export let images: string[] = [];
    export let description: string = "";
    export let detailedDescription: string = "";
    export let tags: string[] = [];
    export let links: ProjectLink[] = [];

    // Resolve active values from project object if provided
    $: resolvedName = project ? project.projectName : projectName;
    $: resolvedImages = project ? project.images : (images.length > 0 ? images : [img]);
    $: resolvedDesc = project ? project.description : description;
    $: resolvedDetailedDesc = project ? (project.detailedDescription || project.description) : (detailedDescription || description);
    $: resolvedTags = project ? (project.tags || []) : tags;
    $: resolvedLinks = project ? (project.links || []) : links;

    let mouseX = 0;
    let mouseY = 0;
    let isHovered = false;
    let isExpanded = false;

    /**
   * @param {{ currentTarget: { getBoundingClientRect: () => any; }; clientX: number; clientY: number; }} event
   */
    function handleMouseMove(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    }

    function openModal() {
        isExpanded = true;
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        isExpanded = false;
        if (typeof document !== 'undefined') {
            document.body.style.overflow = '';
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape' && isExpanded) {
            closeModal();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Card View -->
<div class="fade-in">
    <div
        class="project-card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-white/10 hover:border-white/25 shadow-lg hover:shadow-2xl"
        role="button"
        tabindex="0"
        on:mousemove={handleMouseMove}
        on:mouseenter={() => isHovered = true}
        on:mouseleave={() => isHovered = false}
        on:click={openModal}
        on:keydown={(e) => e.key === 'Enter' && openModal()}
    >
        <!-- Radial Spotlight Effect -->
        <div 
             class="spotlight" 
             style:opacity={isHovered ? 1 : 0}
             style:background="radial-gradient(circle at {mouseX}px {mouseY}px, rgba(255,255,255,0.12) 0%, transparent 25%)"
        >
        </div>
        
        <div class="content">
            <h3 class="pb-3 max-xs:text-xl font-mono text-xl sm:text-2xl font-bold">{resolvedName}</h3>
            <img 
                src={resolvedImages[0]} 
                alt="{resolvedName} Image" 
                class="rounded-lg w-full object-cover object-top max-h-[60vh] mb-4 max-sm:max-h-[40vh]" 
            />
            <p class="font-mono text-sm sm:text-base text-slate-300">{@html resolvedDesc}</p>

            {#if resolvedTags.length > 0}
                <div class="flex flex-wrap gap-2 mt-4 pt-2">
                    {#each resolvedTags as tag}
                        <span class="bg-white/10 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-white/10 font-mono">
                            #{tag}
                        </span>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<!-- Instagram-Style Expanded Modal -->
{#if isExpanded}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="fixed inset-0 top-0 left-0 w-screen h-screen min-h-screen z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto fade-in-modal"
        on:click={closeModal}
    >
        <div 
            class="relative w-full max-w-3xl bg-[#1d1d1d] border border-white/20 rounded-3xl p-5 sm:p-8 shadow-2xl text-white my-auto max-h-[90vh] overflow-y-auto"
            on:click|stopPropagation
        >
            <!-- Close Button -->
            <button 
                type="button"
                aria-label="Close project modal"
                on:click={closeModal}
                class="absolute top-5 right-5 z-20 bg-white/10 hover:bg-white/25 text-white p-2 rounded-full border border-white/20 transition-all duration-200"
            >
                <X size={20} />
            </button>

            <!-- Modal Header -->
            <div class="pr-10 pb-4">
                <h2 class="text-2xl sm:text-3xl font-bold font-mono text-white">{resolvedName}</h2>
            </div>

            <!-- Photo Carousel Top Section -->
            <div class="mb-6">
                <ImageCarousel images={resolvedImages} alt={resolvedName} />
            </div>

            <!-- Tags -->
            {#if resolvedTags.length > 0}
                <div class="flex flex-wrap gap-2 mb-4">
                    {#each resolvedTags as tag}
                        <span class="bg-[#f3ec78]/15 text-[#f3ec78] text-xs px-3 py-1 rounded-full border border-[#f3ec78]/30 font-mono">
                            #{tag}
                        </span>
                    {/each}
                </div>
            {/if}

            <!-- Detailed Writeup -->
            <div class="prose prose-invert max-w-none font-mono text-sm sm:text-base text-slate-200 leading-relaxed mb-6 space-y-3">
                {@html resolvedDetailedDesc}
            </div>

            <!-- External Links -->
            {#if resolvedLinks.length > 0}
                <div class="flex flex-wrap gap-3 pt-4 border-t border-white/15">
                    {#each resolvedLinks as link}
                        <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs sm:text-sm px-4 py-2 rounded-full border border-white/20 transition-all duration-200 hover:scale-105"
                        >
                            <ExternalLink size={15} class="text-[#f3ec78]" />
                            <span>{link.label}</span>
                        </a>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .project-card {
        padding: 1.5rem;
        border-radius: 1rem;
        background: radial-gradient(circle, #262626, rgb(71, 71, 68));
    }

    .spotlight {
        position: absolute;
        inset: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }

    .content {
        position: relative;
        z-index: 1;
    }

    .fade-in-modal {
        animation: fadeInModal 0.25s ease-out forwards;
    }

    @keyframes fadeInModal {
        from {
            opacity: 0;
            transform: scale(0.96);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>
