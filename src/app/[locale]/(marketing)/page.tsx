// import { getList } from '@/data/services/auth-service';
import { setRequestLocale } from 'next-intl/server'
import Banner from './home/banner';
import HomeFeatures from './home/home-features';
import Benefit from './home/benefit';
import DownloadApp from './home/download-app';

type IIndexProps = {
  params: Promise<{ locale: string; children: React.ReactNode }>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata(props: IIndexProps) {
  // const { locale } = await props.params
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'common',
  // });

  return {
    // title: t('meta_title'),
    // description: t('meta_description'),
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'th' }]
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params
  setRequestLocale(locale)
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'common',
  // })

  // getList().then((res) => {
  //   list = res.data;
  //   console.log(res);
  // });
  // console.log(list);

  return (
    <div>
        <Banner />
         <HomeFeatures />
        <Benefit />
        <DownloadApp /> 
      </div>
  )
}
