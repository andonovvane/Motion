import { useDispatch, useSelector } from "react-redux";
import search from "../../public/assets/svgs/search_icon.svg"
import { selectSearchTerm, setSearchTerm } from "../Store/Slices/searchSlice";
import PropTypes from "prop-types";


const PostsFilterHeader = ({setFilter}) => {
    const searchTerm= useSelector(selectSearchTerm)
    const dispatch = useDispatch();

    const handleSearhChange = (e) => {
        dispatch(setSearchTerm(e.target.value))
    }


    return (
        <div className="flex items-center justify-between py-6 bg-gradient-to-t from-white to-slate-50 pr-4 box-border w-full">
            <div className="flex gap-10 ml-5 w-1/2">
                <img src={search} alt="search icon" />
                <input className="w-full py-2 px-2" type="text" placeholder="Search posts ..." value={searchTerm} onChange={handleSearhChange} />
            </div>
            <div className="flex gap-8 text-slate-400 max-h-16">
                <button className="py-5 px-1 hover:cursor-pointer hover:border-b-2 hover:border-indigo-600 hover:text-black" onClick={() => setFilter('all')}>All</button>
                <button className="py-5 px-1 hover:cursor-pointer hover:border-b-2 hover:border-indigo-600 hover:text-black" onClick={() => setFilter('liked')}>Liked</button>
                <button className="py-5 px-1 hover:cursor-pointer hover:border-b-2 hover:border-indigo-600 hover:text-black" onClick={() => setFilter('friends')}>Friends</button>
                <button className="py-5 px-1 hover:cursor-pointer hover:border-b-2 hover:border-indigo-600 hover:text-black" onClick={() => setFilter('follow')}>Follow</button>
            </div>
        </div>
    )
}

PostsFilterHeader.propTypes = {
    setFilter: PropTypes.func.isRequired,
};

export default PostsFilterHeader;