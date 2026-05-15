<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])

const form = ref({
  name: '',
  email: '',
  company: {
    name: ''
  }
})

const isEdit = ref(false)
const currentId = ref(null)

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = response.data
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
  }
}

const saveUser = async () => {
  try {
    if (isEdit.value) {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${currentId.value}`,
        form.value
      )

      alert('Usuario actualizado exitosamente')
    } else {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        form.value
      )

      alert('Usuario creado exitosamente')
    }

    resetForm()
  } catch (error) {
    console.error('Error al guardar usuario:', error)
  }
}

const editUser = (user) => {
  isEdit.value = true
  currentId.value = user.id

  form.value = {
    name: user.name,
    email: user.email,
    company: {
      name: user.company?.name || ''
    }
  }
}

const deleteUser = async (id) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)

    users.value = users.value.filter(user => user.id !== id)

    alert('Usuario eliminado exitosamente')
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
  }
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    company: {
      name: ''
    }
  }

  isEdit.value = false
  currentId.value = null
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-4">Gestión de usuarios</h1>

    <form class="mb-4" @submit.prevent="saveUser">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Ingrese el nombre"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Ingrese el email"
          required
        />
      </div>

      <div class="mb-3">
        <label for="company" class="form-label">Empresa</label>
        <input
          v-model="form.company.name"
          type="text"
          class="form-control"
          id="company"
          placeholder="Ingrese la empresa"
          required
        />
      </div>

      <button
        type="submit"
        class="btn"
        :class="isEdit ? 'btn-warning' : 'btn-success'"
      >
        {{ isEdit ? 'Actualizar Usuario' : 'Crear Usuario' }}
      </button>

      <button
        type="button"
        class="btn btn-secondary ms-2"
        @click="resetForm"
      >
        Limpiar
      </button>
    </form>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Empresa</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.company?.name }}</td>
          <td>
            <button
              @click="editUser(user)"
              class="btn btn-sm btn-warning me-2"
            >
              Editar
            </button>

            <button
              @click="deleteUser(user.id)"
              class="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>