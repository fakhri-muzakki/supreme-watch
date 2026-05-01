const getRevenue = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/revenue?days=7`,
    { cache: "no-store" },
  );

  return res.json();
};

export default getRevenue;
