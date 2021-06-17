import Vue from 'vue'
import Router from 'vue-router'
import DataTableVuetify from './components/DataTableVuetify.vue'
import DataTableTest from './components/DataTableTest.vue'
import TableDTest from './components/TableDTest.vue'

Vue.use(Router)

let router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'table-d-test',
			component: TableDTest,
		},
		{
			path: '/tablevd',
			name: 'data-table-test',
			component: DataTableTest,
		},
		{
			path: '/vuetify',
			name: 'data-table-vuetify',
			component: DataTableVuetify,
		}
	]
})

export default router