import { FC, useContext } from "react";

import { FaEye } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { HiSortDescending } from "react-icons/hi";
import { HiSortAscending } from "react-icons/hi";

import { FilterContext } from "../../infrastructure/filter-context";

type FilterProps = {
  selected: number;
  setSelected: (id: number) => void;
};

const MostViewed: FC<FilterProps> = ({ selected, setSelected }) => {
  return (
    <div
      className="d-flex gap-1"
      onClick={() => {
        if (selected === 0) {
          setSelected(-1);
        } else {
          setSelected(0);
        }
      }}
    >
      <FaEye size={20} color={selected === 0 ? "#DC3545" : "#000000"} />
      <text
        style={{
          fontSize: "12px",
          color: selected === 0 ? "#DC3545" : "#000000",
          paddingTop: "2px",
        }}
      >
        Views
      </text>
    </div>
  );
};

const MostLiked: FC<FilterProps> = ({ selected, setSelected }) => {
  return (
    <div
      className="d-flex gap-1"
      onClick={() => {
        if (selected === 1) {
          setSelected(-1);
        } else {
          setSelected(1);
        }
      }}
    >
      <FaThumbsUp size={15} color={selected === 1 ? "#DC3545" : "#000000"} />
      <text
        style={{
          fontSize: "12px",
          color: selected === 1 ? "#DC3545" : "#000000",
          paddingTop: "1px",
        }}
      >
        Likes
      </text>
    </div>
  );
};

const MostCommented: FC<FilterProps> = ({ selected, setSelected }) => {
  return (
    <div
      className="d-flex gap-1"
      onClick={() => {
        if (selected === 2) {
          setSelected(-1);
        } else {
          setSelected(2);
        }
      }}
    >
      <FaCommentDots
        size={15}
        color={selected === 2 ? "#DC3545" : "#000000"}
        style={{ marginTop: "2px" }}
      />
      <text
        style={{
          fontSize: "12px",
          color: selected === 2 ? "#DC3545" : "#000000",
          paddingTop: "1px",
        }}
      >
        Comments
      </text>
    </div>
  );
};

type OrderProps = {
  selectedOrder: number;
  setSelectedOrder: (index: number) => void;
};

const OrderButton: FC<OrderProps> = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <div
      className="d-flex gap-1"
      onClick={() => {
        if (selectedOrder === 0) {
          setSelectedOrder(1);
        } else {
          setSelectedOrder(0);
        }
      }}
    >
      {selectedOrder === 0 ? (
        <>
          <text style={{ fontSize: "12px" }}>Recent</text>
          <HiSortAscending size={15} style={{ marginTop: "3px" }} />
        </>
      ) : (
        <>
          <text style={{ fontSize: "12px" }}>Oldest</text>
          <HiSortDescending size={15} style={{ marginTop: "3px" }} />
        </>
      )}
    </div>
  );
};

const FilterStrip: FC = () => {
  const { selected, setSelected, selectedOrder, setSelectedOrder } =
    useContext(FilterContext);

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="row justify-content-center">
        <div
          className="col-10 mx-auto"
          style={{ minWidth: "600px", maxWidth: "80%" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-4">
              <text style={{ fontSize: "12px", paddingTop: "1px" }}>
                Filter By:
              </text>
              <div className="d-flex gap-3">
                <MostViewed selected={selected} setSelected={setSelected} />
                <MostLiked selected={selected} setSelected={setSelected} />
                <MostCommented selected={selected} setSelected={setSelected} />
              </div>
            </div>
            <div>
              <OrderButton
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterStrip;
