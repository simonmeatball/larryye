<script lang="ts">
    import Button from '../../components/Button.svelte';
    import SmallButton from '../../components/SmallButton.svelte';
    import ProjectCard from '../../components/ProjectCard.svelte';
    import { projectsData } from '$lib/data/projects';
    
    let activeTab: 'hardware' | 'software' = 'hardware'; // Default tab
    
    function switchTab(tab: 'hardware' | 'software') {
        activeTab = tab;
    }

    $: hardwareProjects = projectsData.filter(p => p.category === 'hardware');
    $: softwareProjects = projectsData.filter(p => p.category === 'software');
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
            Projects
        </text>
    </svg>
</div>

<div class="justify-center text-center w-full py-5 space-x-4">
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

<div class="px-4 py-8 max-w-[70rem] mx-auto">
    {#if activeTab === 'hardware'}
        <div class="fade-in">
            <h2 class="text-2xl font-mono mb-4">Hardware Projects</h2>
            <div class="columns-1 sm:columns-2 gap-4 [column-fill:_balance] space-y-4">
                {#each hardwareProjects as proj (proj.id)}
                    <ProjectCard project={proj} />
                {/each}
            </div>
        </div>
    {:else}
        <div class="fade-in">
            <h2 class="text-2xl font-mono mb-4">Software Projects</h2>
            <div class="columns-1 sm:columns-2 gap-4 [column-fill:_balance] space-y-4">
                {#each softwareProjects as proj (proj.id)}
                    <ProjectCard project={proj} />
                {/each}
            </div>
        </div>
    {/if}

    <div class="justify-center text-center w-full mt-8">
        <Button label="Return Home" href="/" />
    </div>
</div>

<style>
    .fade-in {
        animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>