<script lang="ts">
    import { X, ExternalLink, Calendar, MapPin, Briefcase, Cpu, Code2 } from 'lucide-svelte';
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
    $: resolvedRole = project?.role;
    $: resolvedOrg = project?.organization;
    $: resolvedLocation = project?.location;
    $: resolvedDate = project?.dateDisplay;
    $: resolvedCategory = project?.category || 'hardware';
    $: resolvedType = project?.type || 'project';
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
<div class="fade-in h-full">
    <div
        class="project-card h-full relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-white/10 hover:border-white/25 shadow-lg hover:shadow-2xl flex flex-col justify-between"
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
        
        <div class="content flex flex-col h-full justify-between">
            <div>
                <!-- Header Badges: Date & Category -->
                <div class="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                    {#if resolvedDate}
                        <span class="inline-flex items-center gap-1.5 bg-white/10 text-amber-200/90 text-xs px-2.5 py-1 rounded-full font-mono border border-amber-200/20">
                            <Calendar size={13} class="text-amber-300" />
                            <span>{resolvedDate}</span>
                        </span>
                    {/if}

                    <div class="flex items-center gap-1.5 ml-auto">
                        {#if resolvedCategory === 'hardware'}
                            <span class="inline-flex items-center gap-1 bg-cyan-500/15 text-cyan-300 text-xs px-2.5 py-1 rounded-full font-mono border border-cyan-500/30">
                                <Cpu size={12} />
                                <span>Hardware</span>
                            </span>
                        {:else}
                            <span class="inline-flex items-center gap-1 bg-purple-500/15 text-purple-300 text-xs px-2.5 py-1 rounded-full font-mono border border-purple-500/30">
                                <Code2 size={12} />
                                <span>Software</span>
                            </span>
                        {/if}
                    </div>
                </div>

                <!-- Title & Role Subtitle -->
                <div class="mb-3 text-left">
                    <h3 class="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">{resolvedName}</h3>
                    {#if resolvedRole && resolvedRole !== resolvedName}
                        <p class="font-mono text-xs sm:text-sm text-slate-300 font-medium mt-0.5 flex items-center gap-1">
                            <Briefcase size={13} class="text-slate-400 shrink-0" />
                            <span>{resolvedRole}</span>
                        </p>
                    {/if}
                </div>

                <!-- Featured Image -->
                <img 
                    src={resolvedImages[0]} 
                    alt="{resolvedName} Image" 
                    class="rounded-lg w-full object-cover object-top max-h-[45vh] mb-3.5 max-sm:max-h-[35vh] border border-white/5 shadow-inner" 
                />

                <!-- Summary Description -->
                <p class="font-mono text-sm sm:text-base text-slate-300 text-left leading-relaxed">{@html resolvedDesc}</p>
            </div>

            <!-- Tags -->
            {#if resolvedTags.length > 0}
                <div class="flex flex-wrap gap-1.5 mt-3.5 pt-2 border-t border-white/10">
                    {#each resolvedTags as tag}
                        <span class="bg-white/10 text-slate-300 text-xs px-2.5 py-0.5 rounded-full border border-white/10 font-mono">
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
            class="relative w-full max-w-3xl bg-[#1d1d1d] border border-white/20 rounded-3xl p-5 sm:p-8 shadow-2xl text-white my-auto max-h-[90vh] overflow-y-auto text-left"
            on:click|stopPropagation
        >
            <!-- Close Button -->
            <button 
                type="button"
                aria-label="Close modal"
                on:click={closeModal}
                class="absolute top-5 right-5 z-20 bg-white/10 hover:bg-white/25 text-white p-2 rounded-full border border-white/20 transition-all duration-200"
            >
                <X size={20} />
            </button>

            <!-- Modal Header -->
            <div class="pr-10 pb-3">
                <div class="flex items-center gap-2 flex-wrap mb-2">
                    {#if resolvedDate}
                        <span class="inline-flex items-center gap-1.5 bg-white/10 text-amber-200 text-xs px-3 py-1 rounded-full font-mono border border-amber-200/20">
                            <Calendar size={13} class="text-amber-300" />
                            <span>{resolvedDate}</span>
                        </span>
                    {/if}
                    {#if resolvedLocation}
                        <span class="inline-flex items-center gap-1.5 bg-white/10 text-slate-300 text-xs px-3 py-1 rounded-full font-mono border border-white/15">
                            <MapPin size={13} class="text-rose-400" />
                            <span>{resolvedLocation}</span>
                        </span>
                    {/if}
                    {#if resolvedCategory === 'hardware'}
                        <span class="inline-flex items-center gap-1 bg-cyan-500/15 text-cyan-300 text-xs px-3 py-1 rounded-full font-mono border border-cyan-500/30">
                            <Cpu size={13} />
                            <span>Hardware</span>
                        </span>
                    {:else}
                        <span class="inline-flex items-center gap-1 bg-purple-500/15 text-purple-300 text-xs px-3 py-1 rounded-full font-mono border border-purple-500/30">
                            <Code2 size={13} />
                            <span>Software</span>
                        </span>
                    {/if}
                </div>

                <h2 class="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">{resolvedName}</h2>
                {#if resolvedRole && resolvedRole !== resolvedName}
                    <p class="font-mono text-sm sm:text-base text-slate-300 mt-1 flex items-center gap-1.5 font-semibold">
                        <Briefcase size={15} class="text-[#f3ec78]" />
                        <span>{resolvedRole}</span>
                        {#if resolvedOrg && resolvedOrg !== resolvedName}
                            <span class="text-slate-500 font-normal">| {resolvedOrg}</span>
                        {/if}
                    </p>
                {/if}
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
        transition: opacity 0.2s ease;
        border-radius: 1rem;
    }

    .fade-in {
        animation: fadeIn 0.3s ease-in;
    }

    .fade-in-modal {
        animation: fadeInModal 0.2s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInModal {
        from { opacity: 0; transform: scale(0.97); }
        to { opacity: 1; transform: scale(1); }
    }
</style>
