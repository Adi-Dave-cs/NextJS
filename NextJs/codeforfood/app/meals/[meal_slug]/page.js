export default function dynamicPage({ params }) {
  return (
    <>
      <h1>This is dynamicPage component ! {params.meal_slug}</h1>
    </>
  );
}
