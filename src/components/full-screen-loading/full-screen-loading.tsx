import fullScreenStyles from '@/components/full-screen-loading/full-screen-loading.module.css';

export default function FullScreenLoading() {
  return (
    <section className={fullScreenStyles.wrap}>
      <span className={fullScreenStyles.loading} />
    </section>
  );
}
