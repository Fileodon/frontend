import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import BreadCrumbs from '../../app/components/BreadCrumbs.vue'

describe('BreadCrumbs', () => {
	it('renders configured breadcrumb links followed by the current page title', async () => {
		const wrapper = await mountSuspended(BreadCrumbs, {
			route: '/test',
		})

		const links = wrapper.findAll('#breadcrumbs a')
		expect(links).toHaveLength(1)
		expect(links[0]?.text()).toBe('Home')
		expect(links[0]?.attributes('href')).toBe('/')
		expect(wrapper.findAll('#breadcrumbs li').map(item => item.text())).toEqual([
			'Home',
			'Test',
		])
	})

	it('renders only the current page when there are no configured breadcrumbs', async () => {
		const wrapper = await mountSuspended(BreadCrumbs, {
			route: '/test/foo',
		})

		expect(wrapper.findAll('#breadcrumbs a')).toHaveLength(0)
		expect(wrapper.findAll('#breadcrumbs li')).toHaveLength(1)
	})
})
