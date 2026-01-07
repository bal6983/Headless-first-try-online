export const dynamic = "force-dynamic";

type WooOrder = {
  id?: number;
  payment_method?: string;
};

type SearchParams = {
  order?: string | string[];
};

type ThankYouPageProps = {
  searchParams: Promise<SearchParams>;
};

const BANK_TRANSFER_METHOD = "bacs";
const BANK_TRANSFER_LABEL =
  "\u03a3\u03c4\u03bf\u03b9\u03c7\u03b5\u03af\u03b1 \u03a4\u03c1\u03b1\u03c0\u03b5\u03b6\u03b9\u03ba\u03ae\u03c2 \u039a\u03b1\u03c4\u03ac\u03b8\u03b5\u03c3\u03b7\u03c2";
const SUCCESS_TITLE =
  "\u0397 \u03C0\u03B1\u03C1\u03B1\u03B3\u03B3\u03B5\u03BB\u03AF\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03B8\u03B7\u03BA\u03B5";
const SUCCESS_MESSAGE =
  "\u0398\u03B1 \u03BB\u03AC\u03B2\u03B5\u03C4\u03B5 email \u03B5\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7\u03C2 \u03B1\u03C0\u03CC \u03C4\u03BF \u03BA\u03B1\u03C4\u03AC\u03C3\u03C4\u03B7\u03BC\u03B1.";
const ORDER_LABEL =
  "\u0391\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 \u03C0\u03B1\u03C1\u03B1\u03B3\u03B3\u03B5\u03BB\u03AF\u03B1\u03C2";
const MISSING_ORDER_TITLE =
  "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B5 \u03C0\u03B1\u03C1\u03B1\u03B3\u03B3\u03B5\u03BB\u03AF\u03B1";
const MISSING_ORDER_MESSAGE =
  "\u0394\u03B5\u03BD \u03C5\u03C0\u03AC\u03C1\u03C7\u03B5\u03B9 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 \u03C0\u03B1\u03C1\u03B1\u03B3\u03B3\u03B5\u03BB\u03AF\u03B1\u03C2 \u03C3\u03C4\u03BF URL.";
const BENEFICIARY_LABEL =
  "\u0394\u03b9\u03ba\u03b1\u03b9\u03bf\u03cd\u03c7\u03bf\u03c2";
const BANK_LABEL = "\u03a4\u03c1\u03ac\u03c0\u03b5\u03b6\u03b1";
const IBAN_LABEL = "IBAN";
const REFERENCE_LABEL = "\u0391\u03b9\u03c4\u03b9\u03bf\u03bb\u03bf\u03b3\u03af\u03b1";
const REFERENCE_VALUE_PREFIX = "\u03a0\u03b1\u03c1\u03b1\u03b3\u03b3\u03b5\u03bb\u03af\u03b1 #";
const BANK_TRANSFER_DETAILS = {
  bank: "Alpha Bank",
  beneficiary:
    "\u0395\u03c0\u03c9\u03bd\u03c5\u03bc\u03af\u03b1 \u0395\u03c0\u03b9\u03c7\u03b5\u03af\u03c1\u03b7\u03c3\u03b7\u03c2",
  iban: "GR00 0000 0000 0000 0000 0000 000",
};

async function fetchOrder(orderId: string): Promise<WooOrder | null> {
  const apiUrl = process.env.WC_API_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!apiUrl || !consumerKey || !consumerSecret) {
    return null;
  }

  const url = new URL(`/wp-json/wc/v3/orders/${orderId}`, apiUrl);
  url.searchParams.set("consumer_key", consumerKey);
  url.searchParams.set("consumer_secret", consumerSecret);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as WooOrder;
  } catch {
    return null;
  }
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const orderParam = resolvedSearchParams.order;
  const orderId = Array.isArray(orderParam)
    ? orderParam[0] ?? ""
    : orderParam ?? "";
  const orderIdNumber = Number(orderId);
  const shouldFetch = Number.isFinite(orderIdNumber) && orderIdNumber > 0;
  const order = shouldFetch ? await fetchOrder(String(orderIdNumber)) : null;
  const isBankTransfer = order?.payment_method === BANK_TRANSFER_METHOD;

  if (!orderId) {
    return (
      <div className="mx-auto w-full max-w-3xl py-10">
        <h1 className="text-2xl font-semibold text-zinc-100">
          {MISSING_ORDER_TITLE}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {MISSING_ORDER_MESSAGE}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-10">
      <h1 className="text-2xl font-semibold text-zinc-100">{SUCCESS_TITLE}</h1>
      <p className="mt-2 text-sm text-zinc-400">{SUCCESS_MESSAGE}</p>
      <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-300 shadow-sm backdrop-blur">
        <span className="text-zinc-400">{ORDER_LABEL}</span>
        <span className="ml-2 text-zinc-100">{orderId}</span>
      </div>

      {isBankTransfer ? (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 text-sm shadow-sm">
          <h2 className="text-base font-semibold text-zinc-900">
            {BANK_TRANSFER_LABEL}
          </h2>
          <dl className="mt-4 grid gap-3 text-sm text-zinc-700">
            <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:items-center sm:gap-3">
              <dt className="text-zinc-500">{BANK_LABEL}</dt>
              <dd className="text-zinc-900 font-medium">
                {BANK_TRANSFER_DETAILS.bank}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:items-center sm:gap-3">
              <dt className="text-zinc-500">{BENEFICIARY_LABEL}</dt>
              <dd className="text-zinc-900 font-medium">
                {BANK_TRANSFER_DETAILS.beneficiary}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:items-center sm:gap-3">
              <dt className="text-zinc-500">{IBAN_LABEL}</dt>
              <dd className="text-zinc-900 font-medium">
                {BANK_TRANSFER_DETAILS.iban}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:items-center sm:gap-3">
              <dt className="text-zinc-500">{REFERENCE_LABEL}</dt>
              <dd className="text-zinc-900 font-medium">
                {`${REFERENCE_VALUE_PREFIX}${order?.id ?? orderId}`}
              </dd>
            </div>
          </dl>
        </div>
      ) : null}
    </div>
  );
}
