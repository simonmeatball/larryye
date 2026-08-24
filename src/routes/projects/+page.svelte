<script lang="ts">
    import Button from '../../components/Button.svelte';
    import SmallButton from '../../components/SmallButton.svelte';
    import ProjectCard from '../../components/ProjectCard.svelte';
    import { projectsData } from '$lib/data/projects';
    
    let activeTab: 'all' | 'hardware' | 'software' = 'all'; // Default to "All"
    
    function switchTab(tab: 'all' | 'hardware' | 'software') {
        activeTab = tab;
    }

    // Projects are sorted chronologically by end date descending (most recent first)
    $: displayedProjects = activeTab === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === activeTab);
</script>

<div class="w-full flex justify-center pt-6 pb-2 max-w-md sm:max-w-xl mx-auto px-4">
    <svg stroke="#bac736" stroke-width="2" class="text-line h-20 sm:h-28 md:h-32 w-full" viewBox="0 0 560 100">
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
            font-size="68">
            Experiences
        </text>
    </svg>
</div>

<!-- Tab Navigation: All, Hardware, Software -->
<div class="flex justify-center items-center text-center w-full py-4 gap-2.5 sm:gap-3 flex-wrap px-4">
    <SmallButton
        label="All"
        className={activeTab === 'all' ? 'active' : ''}
        onClick={() => switchTab('all')}
    />
    <SmallButton
        label="Hardware"
        className={activeTab === 'hardware' ? 'active' : ''}
        onClick={() => switchTab('hardware')}
    />
    <SmallButton
        label="Software"
        className={activeTab === 'software' ? 'active' : ''}
        onClick={() => switchTab('software')}
    />
</div>

<!-- Experiences & Projects Grid (Row by Row: Left, Right, Left, Right) -->
<div class="px-4 py-6 max-w-[70rem] mx-auto">
    <div class="flex items-center justify-between mb-6 border-b border-white/10 pb-3 flex-wrap gap-2">
        <h2 class="text-xl sm:text-2xl font-mono text-slate-200 font-bold">
            {#if activeTab === 'all'}
                All Experiences & Projects
            {:else if activeTab === 'hardware'}
                Hardware Experiences & Projects
            {:else}
                Software Experiences & Projects
            {/if}
            <span class="text-sm font-normal text-[#f3ec78] ml-1.5 font-mono">({displayedProjects.length})</span>
        </h2>
    </div>

    <!-- 2-Column CSS Grid: item 1 (left), item 2 (right), item 3 (left), item 4 (right) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {#each displayedProjects as proj (proj.id)}
            <ProjectCard project={proj} />
        {/each}
    </div>

    <div class="justify-center text-center w-full mt-10">
        <Button label="Return Home" href="/" />
    </div>
</div>

<style>
    :global(.active) {
        border-color: #f3ec78 !important;
        color: #f3ec78 !important;
        background-color: rgba(243, 236, 120, 0.12) !important;
    }
</style>