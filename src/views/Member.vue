<script setup></script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 lg:px-8  border border-red-500">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6 space-x-4" action="#" method="POST">
        <div class="flex justify-center items-center border">
          <label for="name" class="block text-sm leading-6 font-medium text-gray-900 pr-4"
            >姓名</label
          >
          <div class="">
            <input
              type="text"
              name="name"
              id="name"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1-outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        

      </form>
    </div>
  </div>
</template>

<style scoped></style>
