<template>
<div>
    <global-header module="users" @click_event="dialog = true;" title="Users" :items="breadcrumps" />
    <div class="mt-6 mb-6">
      <v-tabs
      fixed-tabs
      color="primary"
      class="elevation-4"
    >
      <v-tab
      @click="title = 'Admins'; GET_ADMINS();"
       class="text-capitalize"
      >
        Admins
      </v-tab>
      <v-tab
      @click="title = 'Police stations'; GET_POLICE_STATIONS();"
       class="text-capitalize"
      >
        Police stations
      </v-tab>
      <v-tab
      @click="title = 'Users'; GET_USERS();"
       class="text-capitalize"
      >
        Users
      </v-tab>
    </v-tabs>
    <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="10"
    class="elevation-4"
    :loading="loading"
    >
     <template v-slot:top>
      <v-toolbar
        flat
        color="accent"
      >
      <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer />
      <v-text-field
        outlined
        dense
        rounded
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="search-input"
      ></v-text-field>
      </v-toolbar>
    </template>
   <template v-slot:item.index="{ index }">
     {{index}}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No data is available!
    </template>
    </v-data-table>
    </div>
</div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    data: () => ({
      title: 'Admins',
      search: '',
      dialog: false,
      dialogDelete: false,
      loading: false,
      breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Users',
          disabled: true,
          href: 'users',
        },
      ],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'index',
        },
        {
          text: 'Username',
          align: 'start',
          sortable: false,
          value: 'usernmae',
        },
        { text: 'Phone', value: 'phone', sortable: false },
        { text: 'E-Mail', value: 'email', sortable: false },
        { text: 'Address', value: 'address', sortable: false },
        { text: 'Age', value: 'age', sortable: false },
        { text: 'City', value: 'city', sortable: false },
        { text: 'Marital status', value: 'marital_status', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      ...mapState('userStore', ['data', 'admins', 'police_stations', 'users']),

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

   async created () {
     await this.initialize()
    },

    methods: {
      ...mapMutations('userStore', ['GET_USERS', 'GET_ADMINS', 'GET_POLICE_STATIONS']),
      ...mapActions('userStore', ['getUsers']),
     async initialize () {
       this.loading = true;
        await this.getUsers();
        this.loading = false;
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style lang="scss" scoped>
div.search-input {
  max-width: 25% !important;
}

@media (max-width: 633px) { 
  div.search-input {
    max-width: 100% !important;
  }
}

.active-tab {
  color: black;
}
</style>