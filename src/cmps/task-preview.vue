<template>
  <li
    @mouseenter="toggleOnHover"
    @mouseleave="toggleOnHover"
    class="task-preview"
  >
    <div class="flex flex-column">
      <span v-if="onHover" @click.stop="openSideBar" class="hover-edit-btn"
        ><i class="fa-solid fa-pencil"></i
      ></span>
      <div class="task-preview-header">
        <div v-if="task.styles" class="image-wrapper"></div>
      </div>
      <p>{{ task.title }}</p>
    </div>
  </li>
  <div class="quick-card-editor">
    <span
      class="icon-lg icon-close quick-card-editor-close-icon js-close-editor"
      >X</span
    >
    <div v-if="isOpen" class="quick-card-editor-card">
      <div
        :style="task.styles"
        class="list-card list-card-quick-edit js-stop is-cov"
      ></div>
      <div class="list-card-details js-card-details">
        <div v-if="task.labels.length" class="list-card-labels js-la">
          <span
            v-for="label in task.labels"
            :key="label.id"
            :style="`backgroundColor:${label.color}`"
            >{{ label }}</span
          >
        </div>
        <textarea
          data-autosize="true"
          dir="auto"
          style="overflow:hidden,overflow-wrap:break-word,resize:none,height:90px"
        ></textarea>
        <div class="badges">
          <span class="js-badges">
            <div v-if="task.isWatched" class="badge badge-watch">
              <i class="fa-regular fa-eye"></i>
            </div>
            <div v-if="task.comments?.length" class="badge comments">
              <i class="fa-regular fa-message"></i
              ><span>{{ task.comments.length }}</span>
            </div>
            <div v-if="task.attachments?.length" class="badge attachments">
              <i class="fa-regular fa-link"></i
              ><span>{{ task.attachments.length }}</span>
            </div>
          </span>
        </div>
        <div class="list-card-members js-list-card-members">
          <div
            v-if="task.members?.length"
            v-for="member in task.members"
            :key="member._id"
            class="member js-member-on-card-menu"
            :style="`backgroundImage:url(${member.imgUrl}),border-radius:50%,height:30px,width:30px`"
          ></div>
        </div>
      </div>
    </div>
    <button class="save-task-btn text-center">Save</button>
    <div class="quick-card-editor-buttons fade-in">
      <router-link
        :to="`${$router.currentRoute._value.path}/${task.groupId}/${task.id}`"
        class="quick-card-editor-buttons-item"
      >
        <span class="icon-sm icon-card"
          ><i class="fa-regular fa-credit-card"></i></span
        ><span class="quick-card-editor-buttons-item-text"
          >Open card</span
        ></router-link
      >
      <span href="#" class="quick-cad-editor-buttons-item js-edit-labels"
        ><span class="icon-sm icon-label"><i class="fa-solid fa-tag"></i></span
        ><span class="quick-card-editor-buttons-item-text"
          >Edit Labels</span
        ></span
      >
      <span href="#" class="quick-cad-editor-buttons-item js-edit-members">
        <span class="icon-sm icon-member"
          ><i class="fa-regular fa-user"></i
        ></span>
        <span class="quick-card-editor-buttons-item-text"
          >Change members</span
        ></span
      >
      <span href="#" class="quick-cad-editor-buttons-item js-edit-cover"
        ><span class="icon-sm icon-card-cover"
          ><i class="fa-regular fa-credit-card"></i
        ></span>
        <span class="quick-card-editor-buttons-item-text"
          >Change cover</span
        ></span
      >
      <span href="#" class="quick-cad-editor-buttons-item js-edit-move-card">
        <span class="icon-sm icon-move"
          ><i class="fa-solid fa-arrow-right"></i
        ></span>
        <span class="quick-card-editor-buttons-item-text">Move</span>
      </span>
      <span href="#" class="quick-cad-editor-buttons-item js-edit-copy-card">
        <span class="icon-sm icon-card"
          ><i class="fa-regular fa-credit-card"></i
        ></span>
        <span class="quick-card-editor-buttons-item-text">Copy</span>
      </span>
      <span href="#" class="quick-cad-editor-buttons-item js-edit-due-date">
        <span class="icon-sm icon-clock"
          ><i class="fa-regular fa-clock"></i
        ></span>
        <span class="quick-card-editor-buttons-item-text">Edit dates</span>
      </span>
      <span href="#" class="quick-cad-editor-buttons-item js-archive">
        <span class="icon-sm icon-archive"
          ><i class="fa-solid fa-box-archive"></i
        ></span>
        <span class="quick-card-editor-buttons-item-text">Archive</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'taskPreview',
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      onHover: false,
      isOpen: false,
    }
  },
  methods: {
    toggleOnHover() {
      this.onHover = !this.onHover
    },
    openSideBar() {
      this.isOpen = true
    },
    closeSideBar() {
      this.isOpen = false
    },
  },
  emits: ['click'],
}
</script>
<style></style>
