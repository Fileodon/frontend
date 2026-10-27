<template>
  <div class="p-10 w-full h-full">
    <h3>Connections</h3>
    <p class="text-gray-500 italic">Manage your SFTP servers and review incoming connection requests</p>
    <section id="cards" class="w-full pt-5 h-fit flex flex-row">
      <div class="stats m-2.5 bg-black/35 border rounded border-gray-600">
        <div class="stat">
          <div class="stat-title">Total connections</div>
          <div class="stat-value font-normal">06</div>
          <div class="stat-desc">Across your organisation</div>
        </div>
      </div>
      <div class="stats m-2.5 bg-black/35 border rounded border-gray-600">
        <div class="stat">
          <div class="stat-title">Active</div>
          <div class="stat-value text-success font-normal">01</div>
          <div class="stat-desc">Ready for file transerfs</div>
        </div>

      </div>
      <div class="stats m-2.5 bg-black/35 border rounded border-gray-600">
        <div class="stat">
          <div class="stat-title">Pending approval</div>
          <div class="stat-value text-warning font-normal">01</div>
          <div class="stat-desc">Review incoming requests</div>
        </div>
      </div>
      <div class="stats m-2.5 bg-black/35 border rounded border-gray-600">
        <div class="stat">
          <div class="stat-title">Offline</div>
          <div class="stat-value text-error font-normal">01</div>
          <div class="stat-desc">Last checked {{ new Date().toLocaleString() }} </div>
        </div>
      </div>
    </section>
    <section id="overview" class="card w-full h-fit border border-gray-600 mt-5">
      <section id="header" class="flex flex-row p-2">
        <input type="search" placeholder="Search..."
          class="w-sm rounded-md border border-gray-600 pl-2.5 outline-0 bg-black/35" />
        <div class="ml-auto">
          <button class="btn btn-soft btn-accent p-[0.6rem]">
            <!-- <Icon name="material-symbols-light:add" /> --> New Connection
          </button>
        </div>
      </section>
      <section id="table" class="flex-1 h-fit bg-black/35 border-gray-600 border m-2">
        <table class="table table-sm w-full h-fit text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Ip</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-gray-600/50"> <!--Man skal manuelt skrive det her på hvert tr tag...-->
              <td>
                <div class="flex-1">
                  <!-- <Icon name="material-symbols-light:dns-outline" class="bg-green-300 pr-5"></Icon> -->
                  Contabo server
                  <p class="text-gray-500 italic">root</p>
                </div>
              </td>
              <td>
                <div class="badge badge-soft badge-success">
                  <div aria-label="success" class="status status-success"></div>
                  Active
                </div>
              </td>
              <td>158.220.124.100:22</td>
              <td>
                <div class="dropdown">
                  <div tabindex="0" role="button" class="btn-ghost hover:cursor-pointer m-1">
                    <Icon name="material-symbols-light:more-vert"></Icon>
                  </div>
                  <ul tabindex="-1"
                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 border-gray-600 border shadow-sm">
                    <li class="border-gray-600 border rounded p-0.5 mb-1 bg-black/35"><a>Item 1</a></li>
                    <li class="border-gray-600 border rounded p-0.5 mb-1 bg-black/35"><a>Item 2</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="hover:bg-gray-600/50"> <!--Man skal manuelt skrive det her på hvert tr tag...-->
              <td>
                Hetzner server
                <p class="text-gray-500 italic">Jakob</p>
              </td>
              <td>
                <div class="badge badge-soft badge-warning">
                  <div aria-label="warning" class="status status-warning"></div>
                  Pending
                </div>
              </td>
              <td>155.163.181.218:22</td>
              <td>
                <button class="btn btn-sm btn-outline btn-error mr-2">Reject</button>
                <button class="btn btn-sm btn-success">Accept</button>
                <!-- <div class="dropdown">
                  <div tabindex="0" role="button" class="btn-ghost hover:cursor-pointer m-1">
                    <Icon name="material-symbols-light:more-vert"></Icon>
                  </div>
                  <ul tabindex="-1"
                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 border-gray-600 border shadow-sm">
                    <li class="border-gray-600 border rounded p-0.5 mb-1 bg-black/35"><a>Item 1</a></li>
                    <li class="border-gray-600 border rounded p-0.5 mb-1 bg-black/35"><a>Item 2</a></li>
                  </ul>
                </div> -->
              </td>
            </tr>
            <tr class="hover:bg-gray-600/50"> <!--Man skal manuelt skrive det her på hvert tr tag...-->
              <td>
                Hetzner server
                <p class="text-gray-500 italic">seb</p>
              </td>
              <td>
                <div class="badge badge-soft badge-error">
                  <div aria-label="error" class="status status-error"></div>
                  Offline
                </div>
              </td>
              <td>155.163.181.218:22</td>
              <td>
                <button class="btn btn-sm btn-outline btn-warning">Reconnect</button>
              </td>
            </tr>
          </tbody>
        </table>

      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "Connections",
  breadcrumbs: ['index'],
})


</script>

<style scoped></style>