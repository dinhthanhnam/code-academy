import { useEffect } from "react";
import { useAppDispatch } from "@/app/redux/hooks";
import {setRole} from "@/app/redux/slices/roleSlice";
import {fetchRole} from "@/utils/service/RoleService";

export default function RoleDetector() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const SetRole = async () => {  // Thêm async vào đây
            const role = await fetchRole();
            dispatch(setRole(role));
        };

        SetRole();
    }, [dispatch]);

    return null; // Không render gì cả, chỉ chạy logic
}
