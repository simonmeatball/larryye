<script>
    import Button from '../../components/Button.svelte';
</script>

<div class="w-full flex justify-center pt-8 pb-2">
    <h1 class="gradient-title text-5xl sm:text-7xl font-bold tracking-normal select-none">
        Resume
    </h1>
</div>

<div class="justify-center text-center w-full pb-5">
    <img src="/UCLA Resume - Larry Ye (Hardware).jpg" alt="Larry Ye's resume" class="w-10/12 md:w-1/2 mx-auto my-6" />
    <Button label="Return Home" href="/" />
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
</style>