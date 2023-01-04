import { useI18n } from '@solid-primitives/i18n'
import { useParams, useRouteData } from '@solidjs/router'
import { Show, createEffect, createResource, on } from 'solid-js'
import './Article.module.css'

export default () => {
  const params = useParams()
  const locale = useI18n()[1].locale
  const data = useRouteData()

  const [markdown, { refetch }] = createResource(
    async () => (await data[locale()].fetcher()).default
  )

  createEffect(on(locale, refetch, { defer: true }))

  return (
    <div class="pt-20 px-10 color-white">
      <h1>Single article - {params.name}</h1>
      <p>{JSON.stringify(data)}</p>
      <Show when={data && !markdown.loading}>
        <article>{markdown()}</article>
      </Show>
      <Show when={markdown.loading}>
        <h1>Loading...</h1>
      </Show>
    </div>
  )
}
