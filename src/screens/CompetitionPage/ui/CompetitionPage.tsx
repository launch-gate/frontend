import { ChangeEvent, useState } from "react";

import { Input } from "@/shared/components";

export const CompetitionPage = () => {
  const [inputSearch, setInputSearch] = useState("");
  const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  return (
    <div>
      <div>filters</div>
      <div>
        <div>
          <Input
            onChange={handleChangeInputSearch}
            value={inputSearch}
            placeholder="Например, конкурс для биологов..."
          />
        </div>
        <div>list</div>
      </div>
    </div>
  );
};
