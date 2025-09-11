import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { LANGUAGES, useTranslation } from '@/i18n';


const LanguageDropdown = () => {

    const { language, setLanguage } = useTranslation();

    // Make an array of languages from LANGUAGES object
    const languages = useMemo(() => Object.values(LANGUAGES), []);

    const handleToggle = () => {
        if (!language) return;
        const currentIndex = languages.findIndex((l) => l.code === language.code);
        const nextIndex = (currentIndex + 1) % languages.length; 
        setLanguage(languages[nextIndex]);
    };

    return (
        <Button 
            variant='ghost'
            onClick={handleToggle}
            className="text-sm font-semibold inline-flex items-center gap-2 text-[#212044] cursor-pointer select-none px-4 py-2 rounded-full 
                                focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
        >
            <img src={'/assets/svgs/lang-ico.svg'} alt="lang-ico" className="w-4 h-4" />
            {language?.name == 'English'?'العربية' : 'English'}
        </Button>

    )

}

export default LanguageDropdown;