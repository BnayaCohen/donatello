<template>
  <div class="comment-container">
    <div class="task-detail-title">
      <span class="trellicons trellicons-comments"></span>
      <h3>Activity</h3>
    </div>
    <div class="new-comment-container flex align-center">
        <div class="member-icon-container">
            <img class="member-avatar-big" />
        </div>
        <form>
            <div class="comment-frame">
                <div class="comment-box">
                    <textarea class="comment-box-input"></textarea>
                </div>
            </div>
        </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loggedInUser: Object
  }
}
</script>
<style></style>
