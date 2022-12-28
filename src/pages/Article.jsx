import { useI18n } from '@solid-primitives/i18n'
import { useParams, useRouteData } from '@solidjs/router'
import { createResource, Show } from 'solid-js'
import './Article.module.css'

export default () => {
  const params = useParams()
  const locale = useI18n()[1].locale
  const data = useRouteData()
  return (
    <div class="pt-20 px-10 color-white">
      <h1>Single article - {params.name}</h1>
      <p>{JSON.stringify(data)}</p>
      <Show when={locale() === 'zh'}>
        <article>{data.markdownCN()}</article>
      </Show>
      <Show when={locale() === 'en'}>
        <article>{data.markdownEN()}</article>
      </Show>
    </div>
  )
}
