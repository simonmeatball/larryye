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

<div class="w-full flex justify-center pt-8 pb-2">
    <h1 class="gradient-title text-5xl sm:text-7xl font-bold tracking-normal select-none">
        Projects
    </h1>
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
    .gradient-title {
        font-family: 'Pacifico', cursive;
        background: linear-gradient(180deg, #f3ec78 0%, #af4261 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: #f3ec78;
        line-height: 1.25;
    }

    .fade-in {
        animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>