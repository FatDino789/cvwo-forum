import { FaEye } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { HiSortDescending } from "react-icons/hi";
import { HiSortAscending } from "react-icons/hi";
import { useState } from "react";

type FilterProps = {
  selected: number;
  setSelected: (id: number) => void;
};

const MostViewed = ({ selected, setSelected }: FilterProps) => {
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
        }}
      >
        Views
      </text>
    </div>
  );
};

const MostLiked = ({ selected, setSelected }: FilterProps) => {
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
        }}
      >
        Likes
      </text>
    </div>
  );
};

const MostCommented = ({ selected, setSelected }: FilterProps) => {
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
      <FaCommentDots size={15} color={selected === 2 ? "#DC3545" : "#000000"} />
      <text
        style={{
          fontSize: "12px",
          color: selected === 2 ? "#DC3545" : "#000000",
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

const OrderButton = ({ selectedOrder, setSelectedOrder }: OrderProps) => {
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
          <HiSortAscending size={15} />
        </>
      ) : (
        <>
          <text style={{ fontSize: "12px" }}>Oldest</text>
          <HiSortDescending size={15} />
        </>
      )}
    </div>
  );
};

const FilterStrip = () => {
  const [selected, setSelected] = useState<number>(-1);
  const [selectedOrder, setSelectedOrder] = useState<number>(0);

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="d-flex align-items-center w-100 gap-4">
            <text style={{ fontSize: "12px" }}>Filter By:</text>
            <div className="d-flex gap-3 me-auto">
              <MostViewed selected={selected} setSelected={setSelected} />
              <MostLiked selected={selected} setSelected={setSelected} />
              <MostCommented selected={selected} setSelected={setSelected} />
            </div>
            <OrderButton
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterStrip;
