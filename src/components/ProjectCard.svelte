<script>
    export let projectName = "Project Name";
    export let img = "https://placehold.co/600x400/orange/red";
    export let description = "";
</script>

<style>
    .project-card {
        @apply p-6 rounded-2xl hover:bg-gray-700 transition-all;
        background: radial-gradient(circle, #333333, rgb(105, 105, 99));
    }
</style>

<head>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
</head>

<div class="fade-in">
    <div class="project-card">
        <h3 class="pb-3 max-xs:text-xl">{projectName}</h3>
        <img src={img} alt="{projectName} Image" class="rounded-lg w-full object-cover h-[60vh] mb-4 max-sm:h-[40vh]" />
        <p class="font-mono max-xs:text-sm">{description}</p>
    </div>
</div>
