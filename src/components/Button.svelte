<script>
    export let label = "Click Me";
    export let onClick = () => {};
    export let disabled = false;
    export let className = "";
    export let href = "";

    let coords = { x: 0, y: 0 };
    /**
   * @type {HTMLSpanElement}
   */
    let rippleElement;

    /**
   * @param {{ currentTarget: { getBoundingClientRect: () => any; appendChild: (arg0: HTMLSpanElement) => void; }; clientX: number; clientY: number; }} event
   */
    function handleClick(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Reset ripple
        if (rippleElement) {
            rippleElement.remove();
        }
        
        // Create new ripple
        rippleElement = document.createElement('span');
        rippleElement.classList.add('ripple');
        rippleElement.style.left = `${x}px`;
        rippleElement.style.top = `${y}px`;
        
        event.currentTarget.appendChild(rippleElement);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (rippleElement) {
                rippleElement.remove();
            }
        }, 600);
        
        onClick();
    }
</script>

<button
    class="{className} rounded-full interactive-element hover-lift gradient-border-base"
    on:click={handleClick}
    disabled={disabled}
>
    <span class="gradient-text">{label}</span>
</button>

<style>
    button {
        padding: 0.5rem 1rem;
        background-color: transparent;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 9999px;
    }
    
    button:disabled {
        background-color: #d6d6d6;
        cursor: not-allowed;
    }
</style>