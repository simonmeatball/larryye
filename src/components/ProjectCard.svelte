<script>
    export let projectName = "Project Name";
    export let img = "https://placehold.co/600x400/orange/red";
    export let description = "";

    let mouseX = 0;
    let mouseY = 0;
    let isHovered = false;

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    }
</script>

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
</style>

<div class="fade-in">
    <div
        class="project-card relative overflow-hidden"
        role="button"
        tabindex="0"
        on:mousemove={handleMouseMove}
        on:mouseenter={() => isHovered = true}
        on:mouseleave={() => isHovered = false}
    >
        <div class="spotlight" 
             style:opacity={isHovered ? 1 : 0}
             style:background="radial-gradient(circle at {mouseX}px {mouseY}px, rgba(255,255,255,0.1) 0%, transparent 25%)"
        >
        </div>
        <div class="content">
            <h3 class="pb-3 max-xs:text-xl">{projectName}</h3>
            <img src={img} alt="{projectName} Image" class="rounded-lg w-full object-cover object-top max-h-[60vh] mb-4 max-w-full max-sm:h-[40vh]" />
            <p class="font-mono max-xs:text-sm">{@html description}</p>
        </div>
    </div>
</div>
