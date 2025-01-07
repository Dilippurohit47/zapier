export function TriggerModal({
  onSelect,
  availableItems,
}: {
  // triggerId?: string;
  // id: string;
  onSelect: (props: null | { name: string; id: string; metadata: any }) => void;
  availableItems: { id: string; name: string; image: string }[];
}) {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-slate-100 bg-opacity-70 flex">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <div className="text-xl">select Trigger</div>
            <button
              onClick={() => {
                onSelect(null);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div>
              {availableItems.map(({ id, name, image }) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      onSelect({
                        id,
                        name,
                        metadata: {},
                      });
                    }}
                    className="flex border p-4 cursor-pointer hover:bg-slate-100"
                  >
                    <img
                      src={image}
                      width={30}
                      className="rounded-full object-cover h-30 w-30 "
                    />{" "}
                    <div className="flex flex-col justify-center"> {name} </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
