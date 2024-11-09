<template>
  <q-page>
    <div class="q-pa-md row justify-end">
    </div>
    <div class="q-my-xl row justify-center">
      <q-card class="q-pa-lg q-mr-xl" style="width: 25vw; height: fit-content;"> 
        <div class="text-center">
          <h6 style="display: inline;">
            {{ intID !== null ? 'Edit Task' : 'Create Task' }}
          </h6>
        </div>
        <div class="q-mt-md">
          <q-form @submit="submitTask" @reset="resetTask">
            <label>Enter title:</label>
            <q-input placeholder="- Enter -" flat outlined dense v-model="strTitle"></q-input><br>
            <label>Enter title:</label>
            <q-input placeholder="- Enter -" type="textarea" flat outlined dense v-model="strDesc"></q-input><br>
            <label>Select status:</label>
            <q-select
              outlined
              flat
              dense
              v-model="strStatusValue"
              :options="arrStatusOption"
            /><br>
            <label>Select due date:</label>
            <div>
              <q-input
                dense
                outlined
                v-model="strDueDate"
                placeholder="YYYY/MM/DD"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="strDueDate" no-unset mask="DD MMM, YYYY">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    </q-icon>
                </template>
              </q-input>
            </div>
            <div class="text-center">
              <q-btn dense label="Reset" outline type="reset" color="negative" class="q-px-md q-mr-md q-mt-md"></q-btn>
              <q-btn dense label="Submit" type="submit" color="primary" class="q-px-md q-mt-md"></q-btn>
            </div>
          </q-form>
        </div>
      </q-card>
      <q-card style="width: 28vw;"> 
        <div class="q-px-lg q-py-md bg-secondary text-center" >
          <h6 style="display: inline;">Tasks</h6><br>
          <div class="q-mt-sm">
            <span><q-badge rounded color="grey-3"/> - In Progress</span>
            <span class="q-mx-md"><q-badge rounded color="red-2" /> - Pending</span>
            <span><q-badge rounded color="light-green-3" /> - Completed</span>
          </div>
        </div>
        <q-list bordered separator style="height: 49vh; overflow-y: auto;"> 
          <template v-if="arrTaskData.length > 0">
            <q-item 
              v-for="(data, index) in arrTaskData" 
              :key="index" clickable 
              v-ripple 
              class="q-px-lg q-py-md"
              :style="{border: `5px solid ${data.status == 'in progress' ? 'orange' : (data.status == 'pending' ? 'red' : 'green')}`}"
            >
              <q-item-section overline >
                <q-item-label class="text-bold" caption>
                  <span style="color: blue;">Created At: {{ formatDate(data.createdAt) }}</span>
                  <span class="q-ml-lg" style="color: red;">Due Date: {{ formatDate(data.dueDate) }}</span> 
                </q-item-label>
                <q-item-label>{{ data.title }}</q-item-label>
                <q-item-label class="ellipsis">
                  {{ data.description }}
                  <q-tooltip v-if="data.description.length > 45" style="width: 20vw;">{{ data.description }}</q-tooltip>
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn :disable="data.status == 'completed'" round @click="markAsDone(data)" color="positive" text-color="white" icon="check" size="sm" class="glossy"/>
              </q-item-section>
              <q-item-section avatar>
                <q-btn round @click="editTask(data._id, data.title, data.description, data.status, data.dueDate)" color="teal" text-color="white" icon="edit" size="sm" class="glossy"/>
              </q-item-section>
              <q-item-section avatar>
                <q-btn round @click="deleteTask(data._id)" color="red" text-color="white" icon="delete" size="sm" class="glossy"/>
              </q-item-section>
            </q-item>
          </template>
          <q-item v-else>
            <q-item-section>
              No tasks found.
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import axios from 'axios';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const q = useQuasar();
    const auth = useAuthStore();
    return {
      q,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      },
      auth,
    }
  },
  data() {
    return {
      strTitle: '',
      strDesc: '',
      arrStatusOption: ['Pending', 'In Progress', 'Completed'],
      arrTaskData: [],
      strStatusValue: 'Pending',
      strDueDate: this.formatDate(Date.now()),
      intID: null,
      blnShowColorPickerDialog: false,
    }
  },
  methods: {
    markAsDone(data) {
      this.intID = data._id;
      this.strDesc = data.description;
      this.strTitle = data.title;
      this.strStatusValue = 'completed';
      this.submitTask();
    },
    resetTask() {
      this.intID = null;
      this.strTitle = '';
      this.strDesc = '';
      this.strStatusValue = 'Pending';
      this.strDueDate = this.formatDate(Date.now());
    },

    formatDate(date) {
      return dayjs(date).format('DD MMM, YYYY');
    },
    formatDateWithFormat(date, format) {
      return dayjs(date).format(format);
    },
    editTask(id, title, desc, status, dueDate) {
      this.intID = id;
      this.strTitle = title;
      this.strDesc = desc;
      this.strStatusValue = status.charAt(0).toUpperCase() + status.slice(1);
      this.strDueDate = this.formatDate(dueDate);
    },

    deleteTask(taskId) {
      axios.delete(`http://localhost:3001/tasks/${taskId}`).then((response) => {
        if (response.status == 200) {
          this.callMainApi();
          this.q.notify({
            color: 'negative',
            message: 'Task deleted successfully'
          })
        }
      })
    },

    submitTask() {
      let objData = {
        title: this.strTitle,
        description: this.strDesc,
        status: this.strStatusValue.toLowerCase(),
        dueDate: this.formatDateWithFormat(this.strDueDate, 'YYYY-MM-DD'),
      }
      if (this.intID == null) {
        axios.post('http://localhost:3001/tasks/', objData).then((response) => {
          if (response.status == 200) {
            this.strTitle = '',
              this.strDesc = '',
              this.strStatusValue = 'Pending',
              this.callMainApi();
            this.q.notify({
              color: 'positive',
              message: 'Task added successfully'
            })
          }
        }).catch((err) => {
          this.q.notify({
            color: 'negative',
            message: 'Task not added, please try again'
          })
        })
      }
      else {
        axios.put(`http://localhost:3001/tasks/${this.intID}`, objData).then((response) => {
          if (response.status == 200) {
            this.intID = null;
            this.strTitle = '';
            this.strDesc = '';
            this.strStatusValue = 'Pending';
            this.callMainApi();
            this.q.notify({
              color: 'positive',
              message: 'Task added successfully'
            })
          }
        }).catch((err) => {
          this.q.notify({
            color: 'negative',
            message: 'Task not added, please try again'
          })
        })
      }
    },
    callMainApi() {
      axios.get('http://localhost:3001/tasks/').then((response) => {
        this.arrTaskData = response.data.data;
      })
    },
  },
  beforeMount() {
    this.callMainApi();
  },
})
</script>
