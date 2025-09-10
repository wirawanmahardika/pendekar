import { Helmet } from 'react-helmet'
import { STRINGS } from '../utils/strings'
import { KODE_SLUG } from '../utils/api'

export default function HeadHtml({title}: {title: string}) {
    return <Helmet>
        <link rel="icon" type="image/svg+xml" href={STRINGS[KODE_SLUG].logo_kab_url} />
        <title>{title} | {STRINGS[KODE_SLUG].nama}</title>
    </Helmet>
}