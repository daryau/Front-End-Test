<template lang="pug">
.task
  .task-add
    h3.task-title.fw600.f20.mt-3 {{titleTask}}
    button.btn-submit.fw400(type='button' @click='isAddTask = true') Add
    TaskAddModal(
        v-if='isAddTask'
        @close='isAddTask = false')
    TaskDetailsModal(v-if="isDetailTask"
      @close="isDetailTask = false"
      :tasksEdit="tasksEdit")
  transition-group(name='blink')
    .task-list(
        v-for='(taskItem, index) in taskItems'
        :key='taskItem.id'
        ref='todo-list'
        @click="taskEdit(taskItem.id)")
        .task-item
            .task-header
                span.task-status.block.fw700 {{taskItem.status}}
                span.task-time.block.fw700 {{taskItem.deadline}}
            span.task-title.block.fw600 {{taskItem.title}}
            p.task-text {{taskItem.description}}
        .remove-task(v-on:click='removeTask(index)') &times;
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TaskInterface, StatusTask } from '@/types/TaskInterface';
import TheSidebar from '@/components/TheSidebar.vue';
import TaskAddModal from '@/modals/TaskAddModal.vue';
import TaskDetailsModal from '@/modals/TaskDetailsModal.vue';

@Component({
  components: { TaskDetailsModal, TaskAddModal },
})
export default class Tasks extends Vue {
  titleTask: string = 'New task';

  isAddTask: boolean = false;

  isDetailTask: boolean = false;

  taskItems = this.$store.getters.getTaskItems;

  time: Date = new Date();

  // tasks: TaskInterface[] = [];

  tasksEdit: TaskInterface = {} as TaskInterface;

  taskEdit(id: number) {
    this.isDetailTask = true;
    this.tasksEdit = this.$store.getters.getTaskById(id);
  }

  removeTask(index: number) {
    this.$store.dispatch('removeTask', index);
  }

  mounted() { this.startAnimation(); }

  startAnimation() {
    const blinkedTask = this.$refs['todo-list'] as Array<any>;

    for (let i = 0; i < blinkedTask.length; i += 1) {
      setTimeout(() => {
        blinkedTask[i].classList.add('scale-text-list');
      }, 300 * i);

      setTimeout(() => {
        blinkedTask[i].classList.remove('scale-text-list');
      }, 300 * i + 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Sulphur+Point:400,500,600,700&display=swap');
    $gray: #5b5a5a;
    $gray-light: #909090;
    $pink: #f3c5cf;
    $pink-light: #f6c3be;
    $purple: #f088a0;
    $white: #ffffff;
    $dark-gray: #212529;
    $lg-gray: #6c757d;
    $br-lg-gray: #6c757d;
    $purple-dark: #bd11dd;
    .fw700 {font-weight: 700;}

    // animation
    .scale-text-list {animation: scale-text-list-animation 1s;}
    .blink-enter-active {
        animation: blinking-animation .3s ease-out;
        animation-iteration-count: 2;
    }

    @keyframes blinking-animation {
        50% {
            opacity: 0;
            background-color: rgba(255, 255, 255, 0.2);
        }
        100% {background-color: rgba(209, 184, 184, 0.2);}
    }
    @keyframes scale-text-list-animation {50% {font-size: 16px;}}
    h3 {
        font-family: 'Sulphur Point', sans-serif;
        color: $gray;
        margin-left: 15px;
        position: relative;
        margin: 15px;

        &::before {
            content: '';
            position: absolute;
            background-color: $pink-light;
            width: 15px;
            height: 15px;
            border-radius: 50px;
            left: -25px;
            top: 3px;
        }

        &::after {
            content: '';
            position: absolute;
            background-color: $white;
            width: 5px;
            height: 5px;
            border-radius: 50px;
            top: 8px;
            left: -20px;
        }
    }
    hr { margin-bottom: 25px; }

    .task {
        height: 100vh;
        width: 730px;
        margin: auto;
        padding: 25px;
        background: url('../assets/images/bg-task.jpg') no-repeat;
        background-size: cover;
        border-radius: 10px;
        &-add {
          border-bottom: 1px solid #eaeaea;
            &-title{
                line-height: 16px;
                color: $gray;
            }
            .btn-submit {
                width: 90px;
                display: inline-block;
                color: $dark-gray;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                background-color: transparent;
                border: 1px solid transparent;
                padding: .375rem .75rem;
                line-height: 1.5;
                border-radius: .25rem;
                color: $lg-gray;
                border-color: $lg-gray;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                transition: all .5s ease-in-out;
                margin: 0 0 15px;
                    &:hover {
                        color: $white;
                        background-color: $br-lg-gray;
                        border-color: $br-lg-gray;
                    }
            .task-form {
                .form-group {
                    width: 195px !important;
                    .form-input {
                        font-family: 'Open Sans', Helvetica, sans-serif;
                        border: none;
                        border-bottom: 1px solid $pink;
                        background: transparent;
                        border-radius: 0;
                        margin: 5px 0;
                        padding: 5px;
                        height: 25px;
                    }}
                }
            }
        }
        .task-list {
            cursor: pointer;
            width: 50%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            margin: 20px auto;
            background-color: $white;
            padding: 25px;
            border-radius: 25px 5px 25px;
            -webkit-box-shadow: 2px 2px 15px -8px rgba(0,0,0,0.8);
            -moz-box-shadow: 2px 2px 15px -8px rgba(0,0,0,0.8);
            box-shadow: 2px 2px 15px -8px rgba(0,0,0,0.8);
            transition: all 0.5s ease-in-out;

            &:hover {
                border-radius: 0 5px 25px;
                box-shadow: 2px 2px 15px -8px rgba(0,0,0,0.5);
            }
            .task-item {
                width: 80%;
                .task-header {
                    font-family: 'Sulphur Point', sans-serif;
                    color: $purple;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    .task-status {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        padding-left: 6px;
                        &::before {
                            content: '';
                            position: absolute;
                            display: block;
                            background-color: $purple;
                            width: 3px;
                            height: 3px;
                            border-radius: 50px;
                            left: 0;
                        }
                    }
                }
                .task-title {
                    margin-bottom: 15px;
                }
                .task-text {
                    color: $gray-light;
                    line-height: 20px;
                }
            }
            .remove-task {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                background-color: $purple;
                width: 35px;
                height: 35px;
                border-radius: 8px;
                color: $white;
                transition: all 0.1s ease-in-out;
                    &:hover {
                        opacity: 0.5;
                    }
            }
        }
        .task-list:nth-child(2n+1) {
            margin-right: 0;
        }
        .task-list:nth-child(2n) {
            margin-left: 0;
        }
    }

    // media
    @media screen and (max-width: 1145px) {
        .task {
            width: 90%;
            height: 100%;
        }
    }
    @media screen and (max-width: 625px) {
        .f14 {
            font-size: 12px;
        }
        .task {
            padding: 15px;
            .task-list { width: 80%; }
        }
    }

    @media screen and (max-width: 370px) {
        .task {
            .task-list {
                .task-item {
                    width: 65%;
                }
            }
        }
    }
</style>
