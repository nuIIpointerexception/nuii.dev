<script lang="ts">
  import Icon from '@iconify/svelte';

  interface TechItem {
    name: string;
    color: string;
    icon: string;
  }

  const { techStack = [
    { name: "Rust", color: "#DEA584", icon: "simple-icons:rust" },
    { name: "Go", color: "#00ADD8", icon: "simple-icons:go" },
    { name: "JavaScript", color: "#F7DF1E", icon: "simple-icons:javascript" },
    { name: "Svelte", color: "#FF3E00", icon: "simple-icons:svelte" },
    { name: "Zig", color: "#F7A41D", icon: "simple-icons:zig" },
    { name: "C++", color: "#00599C", icon: "simple-icons:cplusplus" },
    { name: "React", color: "#61DAFB", icon: "simple-icons:react" },
    { name: "Blender", color: "#F5792A", icon: "simple-icons:blender" },
    { name: "After Effects", color: "#9999FF", icon: "simple-icons:adobeaftereffects" },
    { name: "Photoshop", color: "#31A8FF", icon: "simple-icons:adobephotoshop" },
    { name: "Figma", color: "#F24E1E", icon: "simple-icons:figma" },
    { name: "Python", color: "#3776AB", icon: "simple-icons:python" },
    { name: "Lua", color: "#2C2D72", icon: "simple-icons:lua" }
  ]} = $props<{ techStack?: TechItem[] }>();
  
  const ANIMATION_DURATION_MS = 800;
  const STACK_OFFSET_PX = 2;
  
  let stackOrder = $state(techStack.map((_:TechItem, i: Number) => i));
  let isAnimating = $state(false);
  let rotations = $state([]);
  let lastAnimatedIndex = $state(null);
  let currentColor = $state(techStack[0].color);

  $effect.pre(() => {
    rotations = techStack.map(() => Math.random() * 22 - 12);
  });
  
  async function rotateTechStack() {
    if (isAnimating) return;
    isAnimating = true;
    currentColor = techStack[stackOrder[1]].color;
    await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION_MS));
    stackOrder = [...stackOrder.slice(1), stackOrder[0]];
    lastAnimatedIndex = stackOrder[stackOrder.length - 1];
    isAnimating = false;
    setTimeout(() => lastAnimatedIndex = null, 300);
  }

  function getItemTransform(index: number) {
    const orderIndex = stackOrder.indexOf(index);
    const baseY = orderIndex * STACK_OFFSET_PX;
    const baseRotation = rotations[index];
    const baseTransform = `translateY(${baseY}px) rotate(${baseRotation}deg)`;
    const hoverTransform = `translateY(${baseY}px) rotate(${baseRotation + 5}deg)`;
    return `--base-transform: ${baseTransform}; --hover-transform: ${hoverTransform}; --rotation: ${baseRotation}deg; --base-y: ${baseY}px;`;
  }

  const getZIndex = (index: number) => 30 + techStack.length - stackOrder.indexOf(index);
</script>

<div class="tech-stack-wrapper">
  <div 
    class="tech-stack-container"
    style="--current-color: {currentColor};"
  >
    <button 
      onclick={rotateTechStack} 
      class="tech-stack-button" 
      disabled={isAnimating}
      style="--animation-duration: {ANIMATION_DURATION_MS}ms;"
    >
      {#each stackOrder as index (index)}
        <div
          class="tech-stack-item"
          class:animating={isAnimating && index === stackOrder[0]}
          class:fading-in={index === lastAnimatedIndex}
          style="background-color: {techStack[index].color}; {getItemTransform(index)} z-index: {getZIndex(index)};"
        >
          <Icon icon={techStack[index].icon} color="white" width="70%" height="70%" />
        </div>
        {#if isAnimating && index === stackOrder[0]}
          <div 
            class="tech-stack-item tech-stack-item-clone rising"
            style="background-color: {techStack[index].color}; {getItemTransform(index)}"
          >
            <Icon icon={techStack[index].icon} color="white" width="70%" height="70%" />
          </div>
        {/if}
      {/each}
    </button>
  </div>
</div>

<style>
  .tech-stack-wrapper {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 60px;
    height: 60px;
  }
  .tech-stack-container {
    position: absolute;
    width: 200px;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--current-color) 30%, transparent) 0%, transparent 70%);
  }
  .tech-stack-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    overflow: visible;
    z-index: 1;
  }
  .tech-stack-item, .tech-stack-item-clone {
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    transform: var(--base-transform);
  }
  .tech-stack-item {
    will-change: transform, opacity;
    transition: transform 0.3s ease;
  }
  .tech-stack-item.animating { 
    opacity: 0;
    transition: none;
  }
  .tech-stack-item.fading-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }
  .tech-stack-item:hover {
    transform: var(--hover-transform);
  }
  .tech-stack-item-clone.rising {
    position: absolute;
    top: 0;
    left: 0;
    transform: var(--base-transform);
    animation: throw-up-and-fall var(--animation-duration) cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes throw-up-and-fall {
    0% { 
      transform: var(--base-transform);
      opacity: 1; 
      z-index: 999;
    }
    40% { 
      transform: translateY(calc(-70px)) scale(1.1) rotate(var(--rotation));
      opacity: 1; 
      z-index: 999;
    }
    40.1% { z-index: -1; }
    60% { 
      transform: translateY(calc(-60px)) scale(1.05) rotate(var(--rotation));
      opacity: 1; 
    }
    80% {
      opacity: 0.9;
    }
    100% { 
      transform: translateY(calc(15px)) scale(0.9) rotate(var(--rotation));
      opacity: 0; 
    }
  }
</style>