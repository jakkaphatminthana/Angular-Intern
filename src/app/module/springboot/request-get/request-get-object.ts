export interface ProvinceSB {
    provinceId: number;
    provinceName: string;
}

export interface DistrictSB {
    districtId: number;
    districtName: string;
    province: {
        provinceId: number;
        provinceName: string;
        active: boolean;
    };
}

export interface SubDistrictSB {
    subdistrictId: number;
    subdistrictName: string;
    district: {
        districtId: number;
        districtName: string;
        province: {
            provinceId: number;
            provinceName: string;
            active: boolean;
        }
    };
}