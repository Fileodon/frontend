<template>
  <div>

    <footer class="footer sm:footer-horizontal border-t-accent border-t-2 text-neutral-content p-10">
      <aside>
        <img src="/fileodon-haj-1.svg" class="w-auto h-20" alt="">
      </aside>
      <nav>
        <h6 class="footer-title">Policies</h6>
        <a class="link link-hover">Cookie</a>
        <a class="link link-hover">ToS</a>
        <a class="link link-hover">GDPR</a>
      </nav>
      <nav>
        <h6 class="footer-title">Sign up</h6>
        <a class="link link-hover">Login</a>
        <a class="link link-hover">Register</a>
        <a class="link link-hover">Reset password</a>
      </nav>
      <nav>
        <h6 class="footer-title">Copyright © {{new Date().getFullYear()}} - All right reserved by <a class="link link-hover"
            href="https://github.com/fileodon">Fileodon</a></h6>

      </nav>
    </footer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>