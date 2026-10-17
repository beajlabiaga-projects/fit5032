<script setup>
import { computed, reactive, ref, watch } from 'vue'

// Receive the column headings and table records from the parent page
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
})

// store the table’s current search, sorting and pagination settings
const search = ref('')
const sortColumn = ref('')
const sortAscending = ref(true)
const currentPage = ref(1)
const rowsPerPage = 10

// create a separate search value for each column
const columnSearches = reactive({})

props.columns.forEach((column) => {
  columnSearches[column.key] = ''
})

// filter the records using the search and each column search
const filteredRows = computed(() => {
  let results = props.rows.filter((row) => {
    const matchesGeneralSearch = props.columns.some((column) =>
      String(row[column.key]).toLowerCase().includes(search.value.toLowerCase()),
    )

    const matchesColumnSearches = props.columns.every((column) =>
      String(row[column.key]).toLowerCase().includes(columnSearches[column.key].toLowerCase()),
    )

    return matchesGeneralSearch && matchesColumnSearches
  })

  // sort a copy of the filtered records when a column is selected.
  if (sortColumn.value) {
    results = [...results].sort((firstRow, secondRow) => {
      const firstValue = String(firstRow[sortColumn.value])
      const secondValue = String(secondRow[sortColumn.value])

      const comparison = firstValue.localeCompare(secondValue, undefined, {
        numeric: true,
      })

      return sortAscending.value ? comparison : -comparison
    })
  }

  return results
})

//calculate how many pages are required.
const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / rowsPerPage)))

// display only ten records on the current page.
const displayedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage
  return filteredRows.value.slice(start, start + rowsPerPage)
})

//sort the selected column, or reverse it when selected again.
const sortTable = (columnKey) => {
  if (sortColumn.value === columnKey) {
    sortAscending.value = !sortAscending.value
  } else {
    sortColumn.value = columnKey
    sortAscending.value = true
  }
}

// return a simple arrow to show the current sort direction.
const sortArrow = (columnKey) => {
  if (sortColumn.value !== columnKey) {
    return '↕'
  }

  return sortAscending.value ? '↑' : '↓'
}

// return to page one whenever a search value changes.
watch(
  [search, columnSearches],
  () => {
    currentPage.value = 1
  },
  { deep: true },
)
</script>

<template>
  <section class="table-panel">
    <label class="general-search">
      Search all columns
      <input v-model="search" type="search" placeholder="Search records" />
    </label>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">
              <button type="button" @click="sortTable(column.key)">
                {{ column.label }} {{ sortArrow(column.key) }}
              </button>
            </th>
          </tr>

          <tr>
            <th v-for="column in columns" :key="`${column.key}-search`">
              <input
                v-model="columnSearches[column.key]"
                type="search"
                :placeholder="`Search ${column.label}`"
                :aria-label="`Search ${column.label}`"
              />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in displayedRows" :key="row.id">
            <td v-for="column in columns" :key="column.key">
              {{ row[column.key] }}
            </td>
          </tr>

          <tr v-if="displayedRows.length === 0">
            <td :colspan="columns.length" class="empty-message">No matching records found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button type="button" :disabled="currentPage === 1" @click="currentPage--">Previous</button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button type="button" :disabled="currentPage === totalPages" @click="currentPage++">
        Next
      </button>
    </div>
  </section>
</template>

<style scoped>
.table-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
}

.general-search {
  display: block;
  max-width: 350px;
  margin: 0 0 1rem auto;
  font-weight: bold;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.65rem;
  border: 1px solid #9daf9f;
  border-radius: 6px;
  font: inherit;
}

.general-search input {
  margin-top: 0.4rem;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.8rem;
  border-bottom: 1px solid #dce3de;
  text-align: left;
}

thead {
  background: #edf4ee;
}

th button {
  border: 0;
  background: transparent;
  color: #174b2d;
  font: inherit;
  font-weight: bold;
  cursor: pointer;
}

.empty-message {
  padding: 2rem;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.6rem 1rem;
  border: 1px solid #2f6f44;
  border-radius: 6px;
  background: white;
  color: #245c38;
  font-weight: bold;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
</style>
