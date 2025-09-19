import { useAuthSuperAdmin } from "../hooks/useAuth";
import HeadHtml from "../components/HeadHtml";
import LoadingDots from "../components/LoadingDots";
import useTemplateDokumen from "../hooks/templateDokumen/useTemplateDokumen";
import NavigationTabs from "../components/templateDokumen/NavigationTabs";
import FormUnggahTemplate from "../components/templateDokumen/FormUnggahTemplate";
import TableDisplayDocuments from "../components/templateDokumen/TableDisplayData";

export default function TemplateDokumen() {
    useAuthSuperAdmin()
    const {
        openFormTambah, filter, filteredDocuments, modulType, loading, optionsFilterTahun,
        setModulType, setOpenFormTambah, setFilter, handleDeleteDokumen,
    } = useTemplateDokumen()

    if (loading) return <LoadingDots />
    return <div className="p-3">
        <HeadHtml title="Template Dokumen" />
        <NavigationTabs modulType={modulType} setModulType={setModulType} setOpenFormTambah={setOpenFormTambah} />
        <TableDisplayDocuments optionsFilterTahun={optionsFilterTahun} filter={filter} setFilter={setFilter} filteredDocuments={filteredDocuments} handleDeleteDokumen={handleDeleteDokumen} />
        <FormUnggahTemplate openFormTambah={openFormTambah} setOpenFormTambah={setOpenFormTambah} />
    </div>
}