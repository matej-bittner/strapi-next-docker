async function getData() {
  try {
    const response = await fetch(
      "http://host.docker.internal:1337/api/home-page"
    );

    // Zkontrolujte, zda je odpověď v pořádku
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    // Pokud fetch selže, vraťte prázdný objekt
    return null;
  }
}

export default async function Home() {
  const dataFromStrapi = await getData();

  // Pokud dataFromStrapi neexistují nebo nejsou validní, nastavte výchozí hodnoty
  const title = dataFromStrapi?.data?.attributes?.title || "Default Title";
  const description =
    dataFromStrapi?.data?.attributes?.description || "Default Description";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </main>
  );
}
